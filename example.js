const mudclient = require('./src/mudclient');

document.body.style.backgroundColor = '#000';

const gameCanvas = document.createElement('canvas');
gameCanvas.width = 512;
gameCanvas.height = 346;

document.body.appendChild(gameCanvas);

(async () => {
    const mc = new mudclient(gameCanvas);
    mc.members = false;
    await mc.startApplication(512, 334, 'Runescape by Andrew Gower', false);
})();

/*(async function () {
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
}*/

/*const oReq = new XMLHttpRequest();
oReq.open('GET', './res/data204/models36.jag', true);
oReq.responseType = 'arraybuffer';

oReq.onload = oEvent => {
    console.log(oEvent);
    //console.log(new Int8Array(oReq.response));
};

oReq.send(null);*/

//let pixels = require('./pixels.json');
//pixels = new Uint32Array(pixels);

/*function fixPixel(pixel) {
	let c = (pixel >> 24) & 255;
	let r = (pixel >> 16) & 255;
	let g = (pixel >> 8) & 255;
	let b = pixel & 255;

	if (c !== 0) {
		return pixel;
	}

	// //invert
	let a = 255;
	//const black = (255 << 24);

	return (a << 24) + (b << 16) + (g << 8) + r;
}

const ctx = gameCanvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, gameCanvas.width, gameCanvas.height);
imageData.data.set(new Uint8ClampedArray(pixels.map(p => fixPixel(p)).buffer), 0, 0);
ctx.putImageData(imageData, 0, 0);*/

/*const { TGA } = require('./src/lib/tga');

const oReq = new XMLHttpRequest();
oReq.open('GET', './res/logo.tga', true);
oReq.responseType = 'arraybuffer';

oReq.onload = oEvent => {
    const tgaimg =  new TGA();
    tgaimg.load(oReq.response);
    console.dir(tgaimg);
    ctx.drawImage(tgaimg.getCanvas(), 20, 20);
};

oReq.send(null);*/