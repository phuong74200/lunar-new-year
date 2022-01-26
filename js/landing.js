const int = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

; (function () {
    let app = new PIXI.Application({ resizeTo: document.getElementById('round'), transparent: true });
    document.getElementById('round').appendChild(app.view);

    const texture = PIXI.Texture.from('../assets/Untitled-1-15.png');
    const texture_1 = PIXI.Texture.from('../assets/Untitled-1-16.png');

    // app.stage.addChild(text);

    let blossoms = {};
    let mult = 10;

    let now = performance.now();
    let now_2 = performance.now();

    const layers = new Array(150).fill(null).map((layer, index) => {
        return new PIXI.display.Group(index, false);
    });

    app.stage = new PIXI.display.Stage();
    app.stage.sortableChildren = true;

    layers.forEach((layer) => {
        app.stage.addChild(new PIXI.display.Layer(layer));
    })

    const update = () => {
        Object.values(blossoms).forEach((blossom, index) => {
            blossom.x += blossom.sx;
            blossom.y += blossom.sy;
            blossom.skew.set(1, blossom.skewX);
            blossom.skewX += blossom.skewS;
            blossom.rotation += blossom.sRotate;

            if (blossom.x > app.view.width * 2 || blossom.y > app.view.height * 2) {
                blossom.destroy();
                delete blossoms[blossom.id];
            }
        });
        if (app.ticker.FPS <= 50) mult++;
        if (performance.now() - now > (1920 / window.innerWidth) * mult) {
            let size = int(10, 30);
            const rotation = int(1, 10) / 400;
            now = performance.now();
            const id = Math.random();

            let sx = (int(5, 40) / 30) + size / 30;
            let sy = (int(5, 40) / 30) + size / 30;

            const skewX = int(180, 360) * PIXI.DEG_TO_RAD;
            const skewS = PIXI.DEG_TO_RAD * (int(2, 4) * Math.random()) / 5;

            const blossom = new PIXI.Sprite(int(1, 10) % 2 == 0 ? texture : texture_1);
            blossoms[id] = blossom;

            // blossom.filters = [
            //     new PIXI.filters.BloomFilter(1),
            // ];

            if (int(1, 20) == 10) {
                size = int(100, 150);
                blossom.filters = [
                    new PIXI.filters.BlurFilter(size / 20),
                ];
            }

            blossom.anchor.set(0.5)
            if (int(1, 100) % 2 == 0) {
                blossom.x = int(0, app.view.width);
                blossom.y = -50;
            } else {
                blossom.y = int(0, app.view.height);
                blossom.x = -50;
            }

            blossom.parentGroup = layers[size - 1];

            blossom.width = size;
            blossom.height = size;

            blossom.size = size;
            blossom.sRotate = rotation;
            blossom.skewX = skewX;
            blossom.skewS = skewS;
            blossom.id = id;
            blossom.sx = sx;
            blossom.sy = sy;

            app.stage.addChild(blossom);
        }

        if (performance.now() - now_2 > mult) {
            let size = int(1, 10);
            const rotation = int(1, 10) / 400;
            now_2 = performance.now();
            const id = Math.random();

            let sx = int(5, 40) / 10;
            let sy = int(5, 40) / 10;

            const skewX = int(180, 360) * PIXI.DEG_TO_RAD;
            const skewS = PIXI.DEG_TO_RAD * (int(2, 4) * Math.random()) / 5;

            const blossom = new PIXI.Sprite(int(1, 10) % 2 == 0 ? texture : texture_1);
            blossoms[id] = blossom;

            blossom.zOrder = size;

            blossom.anchor.set(0.5)
            if (int(1, 100) % 2 == 0) {
                blossom.x = int(0, app.view.width);
                blossom.y = -50;
            } else {
                blossom.y = int(0, app.view.height);
                blossom.x = -50;
            }

            blossom.parentGroup = layers[size - 1];

            blossom.width = size;
            blossom.height = size;

            blossom.size = size;
            blossom.sRotate = rotation;
            blossom.skewX = skewX;
            blossom.skewS = skewS;
            blossom.id = id;
            blossom.sx = sx;
            blossom.sy = sy;

            app.stage.addChild(blossom);
        }
    }

    app.ticker.add(update);
})();