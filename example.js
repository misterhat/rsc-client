const mudclient = require('./src/mudclient');

document.body.style.backgroundColor = '#000';

const gameCanvas = document.createElement('canvas');
gameCanvas.id = 'mudclient';
gameCanvas.width = 512;
gameCanvas.height = 345;

document.body.appendChild(gameCanvas);

const mc = new mudclient();
mc.members = false;
mc.startApplication(512, 334, 'Runescape by Andrew Gower', false);
