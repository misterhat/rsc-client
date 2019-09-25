const WebSocketClient = require('./web-socket-client');

class Socket {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.client = new WebSocketClient();
    }

    async connect() {
        await this.client.connect(`ws://${this.host}:${this.port}`);
    }

    write(bytes, off = 0, len) {
        len = len || bytes.length;
        this.client.send(bytes.slice(off, off + len));
    }

    async read() {
        if (this.lastArrayBufferReceived !== null && this.lastArrayBufferReadIndex < this.lastArrayBufferReceived.length) {
            // if last byte in array then reset lastArrayBufferReadIndex
            return this.readFromLastArray();
        }

        const received = await this.client.receive();

        if (received instanceof Error) {
            throw received;
        }

        this.lastArrayBufferReceived = new Int8Array(received);
        this.lastArrayBufferReadIndex = 0;

        return this.readFromLastArray();
    }

    readFromLastArray() {
        // if last byte in array then reset lastArrayBufferReadIndex
        if (this.lastArrayBufferReadIndex === this.lastArrayBufferReceived.length - 1) {
            const lastByte = this.lastArrayBufferReceived[this.lastArrayBufferReadIndex];
            this.lastArrayBufferReadIndex = 0;
            this.lastArrayBufferReceived = null;

            return lastByte;
        }

        return this.lastArrayBufferReceived[this.lastArrayBufferReadIndex++];
    }

    async readBytes(b, off, len) {
        let c = await this.read();
        b[off] = c;
        let i = 1;

        for (; i < len; i++) {
            c = await this.read();
            b[off + i] = c;
        }

        return i;
    }

    async close() {
        await this.client.disconnect();
    }

    available() {
        return this.client.dataBytesAvailable;
    }
}

module.exports = Socket;