import React, { useEffect, useRef } from "react";
import '../styles/board.css'
const Board = () => {
    const canvasRef = useRef(null);
    const colors = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const colors = document.getElementsByClassName('color');
        console.log(colors);
        const current = {
            color: 'black',
        };

        let dataURL = "";
        let drawing = false;

        const onColorUpdate = (e) => {
            current.color = e.target.className.split(" ")[1];
            console.log(current);
        };

        const drawLine = (x0, y0, x1, y1, color, send) => {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
            context.save();
        };

        const onMouseDown = (e) => {
            drawing = true;
            current.x = e.clientX || e.touches[0].clientX;
            current.y = e.clientY || e.touches[0].clientY;
        }

        const onMouseMove = (e) => {
            if (!drawing) return;

            drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
            current.x = e.clientX || e.touches[0].clientX;
            current.y = e.clientY || e.touches[0].clientY;
        }

        const onMouseUp = (e) => {
            if (!drawing) return;

            drawing = false;
            drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
        }

        canvas.addEventListener("mousedown", onMouseDown, false);
        canvas.addEventListener("mouseup", onMouseUp, false);
        canvas.addEventListener("mouseout", onMouseUp, false);
        canvas.addEventListener("mousemove", onMouseMove, false);


        canvas.addEventListener("touchstart", onMouseDown, false);
        canvas.addEventListener("touchend", onMouseUp, false);
        canvas.addEventListener("touchcancel", onMouseUp, false);
        canvas.addEventListener("touchmove", onMouseMove, false);


        for (let i = 0; i < colors.length; i++) {
            colors[i].addEventListener('click', onColorUpdate, false)
        }

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let img = document.createElement("img");
            img.src = dataURL;
            context.drawImage(img, 0, 0);
            context.restore()
        };

        window.addEventListener("resize", onResize, false);
        onResize();

        // const onDrawingEvent = (data) => {
        //     const w = canvas.width;
        //     const h = canvas.height;
        //     drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
        // }

    }, []);
    return (
        <div>
            <canvas ref={canvasRef} className="whiteboard" />
            <div ref={colors} className="colors">
                <div className="color black" />
                <div className="color green" />
                <div className="color red" />
                <div className="color blue" />
            </div>
        </div>
    );
}

export default Board;