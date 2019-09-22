const GameData = require('./game-data');
const Scene = require('./scene');
const Utility = require('./utility');
const ndarray = require('ndarray');

class World {
    constructor(scene, surface) {
        this.regionWidth = 96;
        this.regionHeight = 96;
        this.anInt585 = 128; 

        // Int8Arrays 
        this.landscapePack = null; 
        this.mapPack = null; 
        this.memberLandscapePack = null;
        this.memberMapPack = null;

        this.worldInitialised = true;
        this.objectAdjacency = ndarray(new Int32Array(this.regionWidth * this.regionHeight), [ this.regionWidth, this.regionHeight ]);
        this.tileDirection = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ]);

        this.wallModels = [];
        this.roofModels = [];

        for (let i = 0; i < 4; i += 1) {
            this.wallModels.push([]);
            this.roofModels.push([]);

            for (let j = 0; j < 64; j += 1) {
                this.wallModels[i].push(null);
                this.roofModels[i].push(null);
            }
        }

        this.terrainColours = new Int32Array(256);
        this.wallsNorthSouth = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ]);
        this.wallsRoof = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ]);
        this.terrainHeight = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ]);
        this.terrainColour = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ]);
        this.localY = new Int32Array(18432);
        this.tileDecoration = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ]);
        this.routeVia = ndarray(new Int32Array(this.regionWidth * this.regionHeight), [ this.regionWidth, this.regionHeight ]);
        this.wallsDiagonal = ndarray(new Int32Array(4 * 2304), [ 4, 2304 ]);
        this.wallsEastWest = ndarray(new Int8Array(4 * 2304), [ 4, 2304 ])
        this.aBoolean592 = false;
        this.playerAlive = false;
        this.terrainHeightLocal = ndarray(new Int32Array(this.regionWidth * this.regionHeight), [ this.regionWidth, this.regionHeight ]);

        this.terrainModels = [];

        for (let i = 0; i < 64; i += 1) {
            this.terrainModels.push(null);
        }

        this.localX = new Int32Array(18432);
        this.baseMediaSprite = 750;

        this.scene = scene;
        this.surface = surface;

        for (let i = 0; i < 64; i++) {
            this.terrainColours[i] = Scene.rgb(255 - i * 4, 255 - ((i * 1.75) | 0), 255 - i * 4);
        }

        for (let j = 0; j < 64; j++) {
            this.terrainColours[j + 64] = Scene.rgb(j * 3, 144, 0);
        }

        for (let k = 0; k < 64; k++) {
            this.terrainColours[k + 128] = Scene.rgb(192 - ((k * 1.5) | 0), 144 - ((k * 1.5) | 0), 0);
        }

        for (let l = 0; l < 64; l++) {
            this.terrainColours[l + 192] = Scene.rgb(96 - ((l * 1.5) | 0), 48 + ((l * 1.5) | 0), 0);
        }
    }

    getWallEastwest(x, y) {
        if (x < 0 || x >= this.regionWidth || y < 0 || y >= this.regionHeight) {
            return 0;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        return this.wallsEastWest.get(h, x * 48 + y) & 0xff;
    }

    setTerrainAmbience(x, y, x2, y2, ambience) {
        let gameModel = this.terrainModels[x + y * 8];

        for (let j1 = 0; j1 < gameModel.numVertices; j1++) {
            if (gameModel.vertexX[j1] === x2 * this.anInt585 && gameModel.vertexZ[j1] === y2 * this.anInt585) {
                gameModel.setVertexAmbience(j1, ambience);
                return;
            }
        }
    }

    getWallRoof(x, y) {
        if (x < 0 || x >= this.regionWidth || y < 0 || y >= this.regionHeight) {
            return 0;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        return this.wallsRoof.get(h, x * 48 + y);
    }

    getElevation(x, y) {
        let sX = x >> 7;
        let sY = y >> 7;
        let aX = x & 0x7f;
        let aY = y & 0x7f;

        if (sX < 0 || sY < 0 || sX >= 95 || sY >= 95) {
            return 0;
        }

        let h = 0;
        let hx = 0;
        let hy = 0;

        if (aX <= this.anInt585 - aY) {
            h = this.getTerrainHeight(sX, sY);
            hx = this.getTerrainHeight(sX + 1, sY) - h;
            hy = this.getTerrainHeight(sX, sY + 1) - h;
        } else {
            h = this.getTerrainHeight(sX + 1, sY + 1);
            hx = this.getTerrainHeight(sX, sY + 1) - h;
            hy = this.getTerrainHeight(sX + 1, sY) - h;
            aX = this.anInt585 - aX;
            aY = this.anInt585 - aY;
        }

        let elevation = h + (hx * aX) / this.anInt585 + (hy * aY) / this.anInt585;

        return elevation;
    }

    getWallDiagonal(x, y) {
        if (x < 0 || x >= regionWidth || y < 0 || y >= regionHeight) {
            return 0;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        return this.wallsDiagonal.get(h, x * 48 + y);
    }

    removeObject2(x, y, id) {
        if (x < 0 || y < 0 || x >= 95 || y >= 95) {
            return;
        }

        if (GameData.objectType[id] === 1 || GameData.objectType[id] === 2) {
            let tileDir = this.getTileDirection(x, y);
            let modelWidth = 0;
            let modelHeight = 0;

            if (tileDir === 0 || tileDir === 4) {
                modelWidth = GameData.objectWidth[id];
                modelHeight = GameData.objectHeight[id];
            } else {
                modelHeight = GameData.objectWidth[id];
                modelWidth = GameData.objectHeight[id];
            }

            for (let mx = x; mx < x + modelWidth; mx++) {
                for (let my = y; my < y + modelHeight; my++) {
                    const adjacency = this.objectAdjacency.get(mx, my);

                    if (GameData.objectType[id] === 1) {
                        this.objectAdjacency.set(mx, my, adjacency | 0x40);
                    } else if (tileDir === 0) {
                        this.objectAdjacency.set(mx, my, adjacency | 2);

                        if (mx > 0) {
                            this.setObjectAdjacency(mx - 1, my, 8);
                        }
                    } else if (tileDir === 2) {
                        this.objectAdjacency.set(mx, my, adjacency | 4);

                        if (my < 95) {
                            this.setObjectAdjacency(mx, my + 1, 1);
                        }
                    } else if (tileDir === 4) {
                        this.objectAdjacency.set(mx, my, adjacency | 8);

                        if (mx < 95) {
                            this.setObjectAdjacency(mx + 1, my, 2);
                        }
                    } else if (tileDir === 6) {
                        this.objectAdjacency.set(mx, my, adjacency | 1);

                        if (my > 0) {
                            this.setObjectAdjacency(mx, my - 1, 4);
                        }
                    }
                }
            }

            this.method404(x, y, modelWidth, modelHeight);
        }
    }

    removeWallObject(x, y, k, id) {
        if (x < 0 || y < 0 || x >= 95 || y >= 95) {
            return;
        }

        if (GameData.wallObjectAdjacent[id] === 1) {
            const adjacency = this.objectAdjacency.get(x, y);

            if (k === 0) {
                this.objectAdjacency.set(x, y, adjacency & 0xfffe);

                if (y > 0) {
                    this.method407(x, y - 1, 4);
                }
            } else if (k === 1) {
                this.objectAdjacency.set(x, y, adjacency & 0xfffd);

                if (x > 0) {
                    this.method407(x - 1, y, 8);
                }
            } else if (k === 2) {
                this.objectAdjacency.set(x, y, adjacency & 0xffef);
            } else if (k === 3) {
                this.objectAdjacency.set(x, y, adjacency & 0xffdf);
            }

            this.method404(x, y, 1, 1);
        }
    }

    method402(i, j, k, l, i1) {
        let j1 = i * 3;
        let k1 = j * 3;
        let l1 = this.scene.method302(l);
        let i2 = this.scene.method302(i1);
        l1 = l1 >> 1 & 0x7f7f7f;
        i2 = i2 >> 1 & 0x7f7f7f;

        if (k === 0) {
            this.surface.drawLineHoriz(j1, k1, 3, l1);
            this.surface.drawLineHoriz(j1, k1 + 1, 2, l1);
            this.surface.drawLineHoriz(j1, k1 + 2, 1, l1);
            this.surface.drawLineHoriz(j1 + 2, k1 + 1, 1, i2);
            this.surface.drawLineHoriz(j1 + 1, k1 + 2, 2, i2);

            return;
        }

        if (k === 1) {
            this.surface.drawLineHoriz(j1, k1, 3, i2);
            this.surface.drawLineHoriz(j1 + 1, k1 + 1, 2, i2);
            this.surface.drawLineHoriz(j1 + 2, k1 + 2, 1, i2);
            this.surface.drawLineHoriz(j1, k1 + 1, 1, l1);
            this.surface.drawLineHoriz(j1, k1 + 2, 2, l1);
        }
    }

    loadSection(x, y, plane, chunk) {
        let mapName = 'm' + plane + x / 10 + x % 10 + y / 10 + y % 10;

        try {
            if (landscapePack !== null) {
                let mapData = Utility.loadData(mapName + '.hei', 0, this.landscapePack);

                if (mapData === null && memberLandscapePack !== null) {
                    mapData = Utility.loadData(mapName + '.hei', 0, this.memberLandscapePack);
                }

                if (mapData !== null && mapData.length > 0) {
                    let off = 0;
                    let lastVal = 0;

                    for (let tile = 0; tile < 2304; ) {
                        let val = mapData[off++] & 0xff;

                        if (val < 128) {
                            this.terrainHeight.set(chunk, tile++, val & 0xff);
                            lastVal = val;
                        }

                        if (val >= 128) {
                            for (let i = 0; i < val - 128; i++) {
                                this.terrainHeight.set(chunk, tile++, lastVal & 0xff);
                            }
                        }
                    }

                    lastVal = 64;

                    for (let tileY = 0; tileY < 48; tileY++) {
                        for (let tileX = 0; tileX < 48; tileX++) {
                            lastVal = this.terrainHeight.get(chunk, tileX * 48 + tileY) + lastVal & 0x7f;
                            this.terrainHeight.set(chunk, tileX * 48 + tileY,(lastVal * 2) & 0xff);
                        }
                    }

                    lastVal = 0;

                    for (let tile = 0; tile < 2304; ) {
                        let val = mapData[off++] & 0xff;

                        if (val < 128) {
                            this.terrainColour.set(chunk, tile++, val & 0xff);
                            lastVal = val;
                        }

                        if (val >= 128) {
                            for (let i = 0; i < val - 128; i++) {
                                this.terrainColour.set(chunk, tile++, lastVal & 0xff);
                            }
                        }
                    }

                    lastVal = 35;

                    for (let tileY = 0; tileY < 48; tileY++) {
                        for (let tileX = 0; tileX < 48; tileX++) {
                            lastVal = this.terrainColour.get(chunk, tileX * 48 + tileY) + lastVal & 0x7f; // ??? wat
                            this.terrainColour.set(chunk, tileX * 48 + tileY, (lastVal * 2) & 0xff);
                        }
                    }
                } else {
                    for (let tile = 0; tile < 2304; tile++) {
                        this.terrainHeight.set(chunk, tile, 0);
                        this.terrainColour.set(chunk, tile, 0);
                    }
                }

                mapData = Utility.loadData(mapName + '.dat', 0, this.mapPack);

                if (mapData === null && this.memberMapPack !== null) {
                    mapData = Utility.loadData(mapName + '.dat', 0, this.memberMapPack);
                }

                if (mapData === null || mapData.length === 0) {
                    throw new Error();
                }

                let off = 0;

                for (let tile = 0; tile < 2304; tile++) {
                    this.wallsNorthSouth.set(chunk, tile, mapData[off++]);
                }

                for (let tile = 0; tile < 2304; tile++) {
                    this.wallsEastWest.set(chunk, tile, mapData[off++]);
                }

                for (let tile = 0; tile < 2304; tile++) {
                    this.wallsDiagonal.set(chunk, tile, mapData[off++] & 0xff);
                }

                for (let tile = 0; tile < 2304; tile++) {
                    let val = mapData[off++] & 0xff;

                    if (val > 0) {
                        this.wallsDiagonal.set(chunk, tile, val + 12000); // why??
                    }
                }

                for (let tile = 0; tile < 2304; ) {
                    let val = mapData[off++] & 0xff;

                    if (val < 128) {
                        this.wallsRoof.set(chunk, tile++, val & 0xff);
                    } else {
                        for (let i = 0; i < val - 128; i++) {
                            this.wallsRoof.set(chunk, tile++, 0);
                        }
                    }
                }

                let lastVal = 0;

                for (let tile = 0; tile < 2304; ) {
                    let val = mapData[off++] & 0xff;

                    if (val < 128) {
                        this.tileDecoration.set(chunk, tile++, val & 0xff);
                        lastVal = val;
                    } else {
                        for (let i = 0; i < val - 128; i++) {
                            this.tileDecoration.set(chunk, tile++, lastVal);
                        }
                    }
                }

                for (let tile = 0; tile < 2304; ) {
                    let val = mapData[off++] & 0xff;

                    if (val < 128) {
                        this.tileDirection.set(chunk, tile++, val & 0xff);
                    } else {
                        for (let i = 0; i < val - 128; i++) {
                            this.tileDirection.set(chunk, tile++, 0);
                        }
                    }
                }

                mapData = Utility.loadData(mapName + '.loc', 0, mapPack);

                if (mapData !== null && mapData.length > 0) {
                    off = 0;

                    for (let tile = 0; tile < 2304; ) {
                        let val = mapData[off++] & 0xff;

                        if (val < 128) {
                            this.wallsDiagonal.set(chunk, tile++, val + 48000);
                        } else {
                            tile += val - 128;
                        }
                    }

                    return;
                }
            } else {
                console.log('stub. removed reading from ../gamedata/');
            }

            return;
        } catch (e) {
        }

        for (let tile = 0; tile < 2304; tile++) {
            this.terrainHeight.set(chunk, tile, 0);
            this.terrainColour.set(chunk, tile, 0);
            this.wallsNorthsouth.set(chunk, tile, 0);
            this.wallsEastwest.set(chunk, tile, 0);
            this.wallsDiagonal.set(chunk, tile, 0);
            this.wallsRoof.set(chunk, tile, 0);
            this.tileDecoration.set(chunk, tile, 0);

            if (plane === 0) {
                this.tileDecoration.set(chunk, tile, -6);
            }

            if (plane == 3) {
                this.tileDecoration.set(chunk, tile, 8); 
            }

            tileDirection.set(chunk, tile, 0);
        }
    }

    method404(x, y, k, l) {
        if (x < 1 || y < 1 || x + k >= this.regionWidth || y + l >= this.regionHeight) {
            return;
        }

        for (let xx = x; xx <= x + k; xx++) {
            for (let yy = y; yy <= y + l; yy++) {
                if ((this.getObjectAdjacency(xx, yy) & 0x63) !== 0 || (this.getObjectAdjacency(xx - 1, yy) & 0x59) !== 0 || (this.getObjectAdjacency(xx, yy - 1) & 0x56) !== 0 || (this.getObjectAdjacency(xx - 1, yy - 1) & 0x6c) !== 0) {
                    this.method425(xx, yy, 35);
                } else {
                    this.method425(xx, yy, 0);
                }
            }
        }
    }

    getObjectAdjacency(x, y) {
        if (x < 0 || y < 0 || x >= this.regionWidth || y >= this.regionHeight) {
            return 0;
        } else {
            return this.objectAdjacency.get(x, y);
        }
    }

    hasRoof(x, y) {
        return this.getWallRoof(x, y) > 0 && this.getWallRoof(x - 1, y) > 0 && this.getWallRoof(x - 1, y - 1) > 0 && this.getWallRoof(x, y - 1) > 0;
    }

    method407(i, j, k) {
        const adjacency = this.objectAdjacency.get(i, j);
        this.objectAdjacency.set(i, j, adjacency & 0xffff - k)
    }

    getTerrainColour(x, y) {
        if (x < 0 || x >= regionWidth || y < 0 || y >= regionHeight) {
            return 0;
        }

        let byte0 = 0;

        if (x >= 48 && y < 48) {
            byte0 = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            byte0 = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            byte0 = 3;
            x -= 48;
            y -= 48;
        }

        return this.terrainColour.get(byte0, x * 48 + y) & 0xff;
    }

    reset() {
        if (this.worldInitialised) {
            this.scene.dispose();
        }

        for (let i = 0; i < 64; i++) {
            this.terrainModels[i] = null;

            for (let j = 0; j < 4; j++) {
                this.wallModels[j][i] = null;
            }

            for (let k = 0; k < 4; k++) {
                this.roofModels[k][i] = null;
            }

        }

        //System.gc();
    }

    setTiles() {
        for (let x = 0; x < this.regionWidth; x++) {
            for (let y = 0; y < this.regionHeight; y++) {
                if (this.getTileDecoration(x, y, 0) === 250) {
                    if (x === 47 && this.getTileDecoration(x + 1, y, 0) !== 250 && this.getTileDecoration(x + 1, y, 0) !== 2) {
                        this.setTileDecoration(x, y, 9);
                    } else if (y === 47 && this.getTileDecoration(x, y + 1, 0) !== 250 && this.getTileDecoration(x, y + 1, 0) !== 2) {
                        this.setTileDecoration(x, y, 9); 
                    } else {
                        this.setTileDecoration(x, y, 2);
                    }
                }
            }
        }
    }

    getWallNorthSouth(x, y) {
        if (x < 0 || x >= this.regionWidth || y < 0 || y >= this.regionHeight) {
            return 0;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        return this.wallsNorthSouth.get(h, x * 48 + y) & 0xff;
    }

    getTileDirection(x, y) {
        if (x < 0 || x >= this.regionWidth || y < 0 || y >= this.regionHeight) {
            return 0;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        return this.tileDirection.get(h, x * 48 + y);
    }

    _getTileDecoration_from4(x, y, unused, def) {
        let deco = this._getTileDecoration_from3(x, y, unused);

        if (deco === 0) {
            return def;
        } else {
            return GameData.tileDecoration[deco - 1];
        }
    }

    _getTileDecoration_from3(x, y, unused) {
        if (x < 0 || x >= this.regionWidth || y < 0 || y >= this.regionHeight) {
            return 0;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        return this.tileDecoration.get(h, x * 48 + y) & 0xff;
    }

    getTileDecoration(...args) {
        switch (args.length) {
            case 3:
                return this._getTileDecoration_from3(...args);
            case 4:
                return this._getTileDecoration_from4(...args);
        }
    }

    setTileDecoration(x, y, v) {
        if (x < 0 || x >= this.regionWidth || y < 0 || y >= this.regionHeight) {
            return;
        }

        let h = 0;

        if (x >= 48 && y < 48) {
            h = 1;
            x -= 48;
        } else if (x < 48 && y >= 48) {
            h = 2;
            y -= 48;
        } else if (x >= 48 && y >= 48) {
            h = 3;
            x -= 48;
            y -= 48;
        }

        this.tileDecoration.set(h, x * 48 + y, v & 0xff);
    }

    route(startX, startY, endX1, endY1, endX2, endY2, routeX, routeY, objects) {
        for (let x = 0; x < this.regionWidth; x++) {
            for (let y = 0; y < this.regionHeight; y++) {
                this.routeVia.set(x, y, 0);
            }
        }

        let writePtr = 0;
        let readPtr = 0;
        let x = startX;
        let y = startY;

        this.routeVia.set(startX, startY, 99);
        routeX[writePtr] = startX;
        routeY[writePtr++] = startY;

        let size = routeX.length;
        let reached = false;

        while (readPtr !== writePtr) {
            x = routeX[readPtr];
            y = routeY[readPtr];
            readPtr = (readPtr + 1) % size;

            if (x >= endX1 && x <= endX2 && y >= endY1 && y <= endY2) {
                reached = true;
                break;
            }

            if (objects) {
                if (x > 0 && x - 1 >= endX1 && x - 1 <= endX2 && y >= endY1 && y <= endY2 && (this.objectAdjacency.get(x - 1, y) & 8) === 0) {
                    reached = true;
                    break;
                }

                if (x < 95 && x + 1 >= endX1 && x + 1 <= endX2 && y >= endY1 && y <= endY2 && (this.objectAdjacency.get(x + 1, y) & 2) === 0) {
                    reached = true;
                    break;
                }

                if (y > 0 && x >= endX1 && x <= endX2 && y - 1 >= endY1 && y - 1 <= endY2 && (this.objectAdjacency.get(x, y - 1) & 4) === 0) {
                    reached = true;
                    break;
                }

                if (y < 95 && x >= endX1 && x <= endX2 && y + 1 >= endY1 && y + 1 <= endY2 && (this.objectAdjacency.get(x, y + 1) & 1) === 0) {
                    reached = true;
                    break;
                }
            }

            if (x > 0 && this.routeVia.get(x - 1, y) === 0 && (this.this.objectAdjacency.get(x - 1, y) & 0x78) === 0) {
                routeX[writePtr] = x - 1;
                routeY[writePtr] = y;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x - 1, y, 2);
            }

            if (x < 95 && this.routeVia.get(x + 1, y) === 0 && (this.objectAdjacency.get(x + 1, y) & 0x72) === 0) {
                routeX[writePtr] = x + 1;
                routeY[writePtr] = y;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x + 1, y, 8);
            }

            if (y > 0 && this.routeVia.get(x, y - 1) === 0 && (this.objectAdjacency.get(x, y - 1) & 0x74) === 0) {
                routeX[writePtr] = x;
                routeY[writePtr] = y - 1;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x, y - 1, 1);
            }

            if (y < 95 && this.routeVia.get(x, y + 1) === 0 && (this.objectAdjacency.get(x, y + 1) & 0x71) === 0) {
                routeX[writePtr] = x;
                routeY[writePtr] = y + 1;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x, y + 1, 4);
            }

            if (x > 0 && y > 0 && (this.objectAdjacency.get(x, y - 1) & 0x74) === 0 && (this.objectAdjacency.get(x - 1, y) & 0x78) == 0 && (this.objectAdjacency.get(x - 1, y - 1) & 0x7c) === 0 && this.routeVia.get(x - 1, y - 1) === 0) {
                routeX[writePtr] = x - 1;
                routeY[writePtr] = y - 1;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x - 1, y - 1, 3);
            }

            if (x < 95 && y > 0 && (this.objectAdjacency.get(x, y - 1) & 0x74) === 0 && (this.objectAdjacency.get(x + 1, y) & 0x72) === 0 && (this.objectAdjacency.get(x + 1, y - 1) & 0x76) === 0 && this.routeVia.get(x + 1, y - 1) === 0) {
                routeX[writePtr] = x + 1;
                routeY[writePtr] = y - 1;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x + 1, y - 1, 9);
            }

            if (x > 0 && y < 95 && (this.objectAdjacency.get(x, y + 1) & 0x71) === 0 && (this.objectAdjacency.get(x - 1, y) & 0x78) === 0 && (this.objectAdjacency.get(x - 1, y + 1) & 0x79) === 0 && this.routeVia.get(x - 1, y + 1) === 0) {
                routeX[writePtr] = x - 1;
                routeY[writePtr] = y + 1;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x - 1, y + 1, 6);
            }

            if (x < 95 && y < 95 && (this.objectAdjacency.get(x, y + 1) & 0x71) === 0 && (this.objectAdjacency.get(x + 1, y) & 0x72) === 0 && (this.objectAdjacency.get(x + 1,y + 1) & 0x73) === 0 && this.routeVia.get(x + 1, y + 1) === 0) {
                routeX[writePtr] = x + 1;
                routeY[writePtr] = y + 1;
                writePtr = (writePtr + 1) % size;
                this.routeVia.set(x + 1, y + 1, 12);
            }
        }

        if (!reached) {
            return -1;
        }

        readPtr = 0;
        routeX[readPtr] = x;
        routeY[readPtr++] = y;

        let stride;

        for (let step = stride = this.routeVia.get(x, y); x !== startX || y !== startY; step = this.routeVia.get.get(x, y)) {
            if (step !== stride) {
                stride = step;
                routeX[readPtr] = x;
                routeY[readPtr++] = y;
            }

            if ((step & 2) !== 0) {
                x++;
            } else if ((step & 8) !== 0) {
                x--;
            }

            if ((step & 1) !== 0) {
                y++;
            } else if ((step & 4) !== 0) {
                y--;
            }
        }

        return readPtr;
    }
}

World.colourTransparent = 12345678;

module.exports = World;