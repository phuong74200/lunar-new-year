const int = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

; (function () {
    let app = new PIXI.Application({ resizeTo: document.getElementById('round'), transparent: true });
    let upLayer = new PIXI.Application({ resizeTo: document.getElementById('round'), transparent: true });
    upLayer.view.className = 'upLayer';

    document.getElementById('round').appendChild(app.view);
    document.getElementById('round').appendChild(upLayer.view);

    const texture = PIXI.Texture.from('../assets/Untitled-1-15.png');
    const texture_1 = PIXI.Texture.from('../assets/Untitled-1-16.png');

    // app.stage.addChild(text);

    let blossoms = {};
    let mult = 50;

    let now = performance.now();
    let now_2 = performance.now();

    const layersDown = new Array(50).fill(null).map((layer, index) => {
        return new PIXI.display.Group(index, false);
    });

    const layersUp = new Array(50).fill(null).map((layer, index) => {
        return new PIXI.display.Group(index, false);
    });

    app.stage = new PIXI.display.Stage();
    app.stage.sortableChildren = true;

    upLayer.stage = new PIXI.display.Stage();
    upLayer.stage.sortableChildren = true;

    layersDown.forEach((layer) => {
        app.stage.addChild(new PIXI.display.Layer(layer));
    })

    layersUp.forEach((layer) => {
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
                sx *= 4;
                sy *= 4;
            }

            blossom.anchor.set(0.5)
            if (int(1, 100) % 2 == 0) {
                blossom.x = int(0, app.view.width);
                blossom.y = -50;
            } else {
                blossom.y = int(0, app.view.height);
                blossom.x = -50;
            }

            blossom.width = size;
            blossom.height = size;

            blossom.size = size;
            blossom.sRotate = rotation;
            blossom.skewX = skewX;
            blossom.skewS = skewS;
            blossom.id = id;
            blossom.sx = sx;
            blossom.sy = sy;

            if (size < 30) {
                blossom.parentGroup = layersDown[size - 1]  || layersDown[0];
                app.stage.addChild(blossom);
            } else {
                blossom.parentGroup = layersUp[size - 50] || layersUp[0];
                upLayer.stage.addChild(blossom);
            }
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

            blossom.width = size;
            blossom.height = size;

            blossom.size = size;
            blossom.sRotate = rotation;
            blossom.skewX = skewX;
            blossom.skewS = skewS;
            blossom.id = id;
            blossom.sx = sx;
            blossom.sy = sy;

            if (size < 30) {
                blossom.parentGroup = layersDown[size - 1]  || layersDown[0];
                app.stage.addChild(blossom);
            } else {
                blossom.parentGroup = layersUp[size - 50] || layersUp[0];
                upLayer.stage.addChild(blossom);
            }
        }
    }

    app.ticker.add(update);
})();

const hScroll = () => {
    let ticking = false;

    let vertical = 0;

    const slides = document.getElementsByClassName('h-scroll');

    [...slides].forEach((elm, index) => {
        elm.style.transform = `translateX(-${(index) * 100}%)`;
    })

    const page = document.getElementById('page')

    const work = () => {
        if (vertical <= 0) {
            vertical = 0;
        }
        const anim = page.animate([
            { transform: `translateX(${vertical * 100}%)` }
        ], {
            duration: 300,
            fill: 'forwards',
        });
        anim.onfinish = () => {
            ticking = false;
            if (vertical > slides.length - 2) {
                vertical = 0;
                page.animate([
                    { transform: `translateX(0%)` }
                ], {
                    duration: 0,
                    fill: 'forwards',
                });
            }
        }
    }

    const scrollPage = (e) => {
        vertical += e.deltaY / 100;
        work();
    }

    document.getElementById('arrowLeft').addEventListener('mouseup', (e) => {
        vertical += 1;
        work();
    })

    document.getElementById('arrowRight').addEventListener('mouseup', (e) => {
        vertical -= 1;
        work();
    })

    document.addEventListener('mousewheel', function (e) {
        if (!ticking) {
            scrollPage(e);
            ticking = true;
        }
    });

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                /* right swipe */
                vertical -= 1;
                work();
            } else {
                /* left swipe */
                vertical += 1;
                work();
            }
        } else {
            if (yDiff > 0) {
                /* down swipe */
            } else {
                /* up swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
}

hScroll();