class Scene {
    static rgb(i, j, k) {
        return -1 - ((i / 8) | 0) * 1024 - ((j / 8) | 0) * 32 - ((k / 8) | 0);
    }
}

module.exports = Scene;