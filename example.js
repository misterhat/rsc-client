const mudclient = require('./src/mudclient');

document.body.style.backgroundColor = '#000';

const gameCanvas = document.createElement('canvas');
gameCanvas.id = 'mudclient';
gameCanvas.width = 512;
gameCanvas.height = 345;

document.body.appendChild(gameCanvas);

/*const mc = new mudclient();
mc.members = false;
mc.startApplication(512, 334, 'Runescape by Andrew Gower', false);*/

(async function () {
    const response = await fetch('./data204/models36.jag');
    const reader = response.body.getReader();

    let finished = false;

    do {
        const { done, value } = await reader.read();
        console.log(typeof value, value);
        finished = done;
    } while (!finished);
})();

const sleep = require('sleep-promise');

class DownloadStream {
    constructor(file) {
        this.file = file;
        this.buffer = null;
        this.availableBytes = 0;
    }

    async readFully(dest, offset, length) {
        if (!this.buffer) {
            const response = await fetch(this.file);
            this.buffer = response.arrayBuffer();
            this.availableBytes = this.buffer.length;
        }

        await sleep(100);

        dest.set(this.buffer.slice(offset, length), offset);
    }
}
