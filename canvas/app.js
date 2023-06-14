const textInput = document.getElementById("text");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save-btn");
const fileInput = document.getElementById("file");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


canvas.width = 800;
canvas.height= 800;
canvas.lineCap = "round";
ctx.lineWidth= lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetX);
}

function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.beginPath();
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.beginPath();
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    ctx.beginPath();
    const colorvalue = event.target.dataset.color;
    ctx.strokeStyle = colorvalue;
    ctx.fillStyle = colorvalue;
    color.value=colorvalue;
}

function onModeClick(){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText="Fill";
    } else{
        isFilling=true;
        modeBtn.innerText="Draw";
    }
}

function onDestroyClick(){
    ctx.fillStyle="white"
    ctx.fillRect(0,0,800,800);
}

function onEraserClick(){
    ctx.strokeStyle="white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,800,800);
    }
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,800,800);
    }
}

function onDoubleClick(event){
    const text= textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px serif";
        ctx.strokeText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }

}

function onSaveClick(event){
    const url = canvas.toDataURL();
}



canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", onColorChange);

colorOption.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
saveBtn.addEventListener("click", onSaveClick);

fileInput.addEventListener("change", onFileChange)