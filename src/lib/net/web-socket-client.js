class WebSocketClient {
    constructor() {
        this.socket = null;

        this._reset();
    }

    get connected() {
        return this._socket !== null && this._socket.readyState === WebSocket.OPEN;
    }
    
    get dataAvailable() {
        return this._receiveDataQueue.length;
    }
    
    get dataBytesAvailable() {
        return this._receiveDataQueue.reduce((a,b) => a + b.byteLength, 0);
    }

    async connect(url, protocols) {
        await this.disconnect();
        this._reset();
        this._socket = new WebSocket(url, protocols);
        this._socket.binaryType = 'arraybuffer';
        return this._setupListenersOnConnect();
    }

    send(data) {
        if (!this.connected) {
            throw this._closeEvent || new Error('Not connected.');
        }

        this._socket.send(data);
    }

    receive() {
        if (this._receiveDataQueue.length !== 0) {
            return Promise.resolve(this._receiveDataQueue.shift());
        }

        if (!this.connected) {
            return Promise.reject(this._closeEvent || new Error('Not connected.'));
        }

        const receivePromise = new Promise((resolve, reject) => {
            this._receiveCallbacksQueue.push({ resolve, reject });
        });

        return receivePromise;
    }

    receiveLocal() {
        if (this._receiveDataQueue.length !== 0) {
            return this._receiveDataQueue.shift();
        }

        return null;
    }

    disconnect(code, reason) {
        if(!this.connected) {
            return Promise.resolve(this._closeEvent);
        }

        return new Promise((resolve, reject) => {
            const callbacks = {
                resolve: dummy => {
                    this._receiveCallbacksQueue.push(callbacks);
                },

                reject: resolve
            };

            this._receiveCallbacksQueue.push(callbacks);
            this._socket.close(code, reason);
        });
    }

    _setupListenersOnConnect() {
        const socket = this._socket;

        return new Promise((resolve, reject) => {
            const handleMessage = event => {
                const messageEvent = event ;

                if (this._receiveCallbacksQueue.length !== 0) {
                    this._receiveCallbacksQueue.shift().resolve(messageEvent.data);
                    return;
                }

                const data = messageEvent.data;

                //if (data instanceof ArrayBuffer) {
                this._receiveDataQueue.push(data);
                //}
            };

            const handleOpen = () => {
                socket.addEventListener('message', handleMessage);

                socket.addEventListener('close', event => {
                    this._closeEvent = event;

                    while (this._receiveCallbacksQueue.length !== 0) {
                        this._receiveCallbacksQueue.shift().reject(this._closeEvent);
                    }
                });

                resolve();
            };

            socket.addEventListener('error', reject);
            socket.addEventListener('open', handleOpen);
        });
    }

    _reset() {
        this._receiveDataQueue = [];
        this._receiveCallbacksQueue = [];
        this._closeEvent = null;
    }
}

module.exports = WebSocketClient;