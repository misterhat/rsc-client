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
            this.xhr.onerror = e => reject(e);
            this.xhr.onload = () => resolve(new Int8Array(xhr.response));
            this.xhr.send();
        });
    }

    async readFully(dest, off = 0, len) {
        if (typeof len === 'undefined') {
            len = dest.length;
        }

        if (!this.buffer) {
            this.buffer = await _loadResBytes();
        } else {
            await sleep(250);
        }

        dest.set(this.buffer.slice(off, len), off);
    }
}

module.exports = FileDownloadStream;
