const Packet = require('./packet');

class ClientStream extends Packet {
    constructor(socket) {
        super();
        this.closing = false;
        this.closed = false;
        this.socket = socket;
        /*instream = socket.getInputStream();
        outstream = socket.getOutputStream();
        closed = false;*/
    }

    async readStream() {
        return await this.socket.read();
    } 

    availableStream() {
        return this.socket.available();
    }

    async readStreamBytes(len, off, buff) {
        await this.socket.readBytes(buff, off, len);
    }

    writeStreamBytes(buff, off, len) {
        if (this.closing) {
            return;
        }

        this.socket.write(buff, off, len);
    }
}

module.exports = ClientStream;