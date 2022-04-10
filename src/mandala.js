window.onload = () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const gui = new dat.GUI({name: 'My GUI'});

    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const properties = {
        NUM: 300,
        radius: 100,
        centerX: 300,
        centerY: 200,
        period: 15,
        amp: 3,
        numberOfCircles: 10,
        speed: 25
    };

    gui.add(properties, "amp", 0, 40).step(1)
    gui.add(properties, "radius", 40, height / 2).step(1)
    gui.add(properties, "period", 0, 20).step(1)
    gui.add(properties, "numberOfCircles", 1, 20).step(1)
    gui.add(properties, "centerX", 1, width)
    gui.add(properties, "centerY", 1, height)
    gui.add(properties, "speed", 10, 100)

    let x, y, varRadius, teta;

    const drawCircle = (radius, color, offset) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i <= properties.NUM; i++) {
            teta = (i * 2 * Math.PI) / properties.NUM;
            varRadius =
                radius + properties.amp * Math.cos(teta * properties.period + offset);

            x = properties.centerX + varRadius * Math.cos(teta);
            y = properties.centerY + varRadius * Math.sin(teta);

            // ctx.fillRect(x, y, 2, 2);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = "white"
        ctx.fill();
    };

    let time = 0;
    const Draw = () => {
        time++;
        ctx.clearRect(0,0, width, height)
        ctx.fillStyle = "black"
        ctx.fillRect(0,0, width, height)

        for (let i = 0; i < properties.numberOfCircles; i++) {
            // const color = "black" ;
            drawCircle(
                properties.radius - i * 10,
                `hsl(${120 + i * 10},50%,50%)`,
                // color,
                i * (time / 25 )
            );
        }
    };

    const render = () => {
        Draw();
        window.requestAnimationFrame(render);
    };

    render();
};
