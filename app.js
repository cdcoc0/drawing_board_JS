//https://developer.mozilla.org/ko/docs/Web/API/CanvasRenderingContext2D

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//default
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;
//ctx.fillRect(50, 20, 100, 40) //x, y, width, height

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else { //canvas 픽셀 사이즈 필(pixel modifier)
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanvasClick(event) {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
}

function handleCM(event) {
    event.preventDefault();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //click
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); //mouse goes ouside the canvas
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors) {
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
//console.log(Array.from(colors));
};

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Brush";
    }
}

//to data
function handleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    //download = a태그 속성
    link.download = "paint";
    link.click();
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}