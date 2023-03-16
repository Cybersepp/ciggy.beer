/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById("generative-art-canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
var heightRatio = 0.5;
canvas.height = canvas.width * heightRatio;
const colors = ["#228B22", "#4F7942", "#50C878", "#0FFF50", "#0BDA51", "#00FF7F"];

class Root {
    constructor(x, y) {
        console.log("yooo")
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 2 - 2;
        this.speedY = Math.random() * 2 - 2;
        this.maxSize = Math.random() + 17;
        this.size = Math.random() + 2;
        this.angleY = Math.random();
        this.angleX = Math.random();
        this.vs = Math.random() * 2 + 0.05;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += 0.5;
        this.angle += 0.5;
        var color = colors[Math.floor(Math.random()*colors.length)];
        if (this.size < this.maxSize) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.strokeRect(this.x, this.y, this.size, this.size);
            requestAnimationFrame(this.update.bind(this));
            ctx.restore();

        }
    }
}
canvas.addEventListener('mousemove', function(e) {
    const canvasX = translatedX(e.x);
    const canvasY = translatedY(e.y);
    const root = new Root(canvasX, canvasY);
    root.update();
});

canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);


// ultra chad for scaling: https://stackoverflow.com/questions/57910824/js-using-wrong-coordinates-when-drawing-on-canvas-with-margin
function translatedX(x){
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (x - rect.left);
}

function translatedY(y){
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (y - rect.top);
}
