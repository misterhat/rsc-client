// a quick shim for downloading files 

const sleep = require('sleep-promise');

class FileDownloadStream {
    constructor(file) {
        this.url = url;

        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = 'arraybuffer';
        this.xhr.open('GET', file, true);

        this.buffer = null;
    }

    async _loadResBytes() {
        return new Promise((resolve, reject) => {
            xhr.onerror = e => reject(e);

            xhr.onload = () => {
                resolve(new Int8Array(xhr.response));
            };
        });
    }

    async readFully(dest, off, len) {
        if (!this.buffer) {
            this.buffer = await _loadResBytes();
        }

        await sleep(100);

        dest.set(this.buffer.slice(off, len), off);
    }
}

module.exports = FileDownloadStream;