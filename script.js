// globals
var initGridIndex;
var container;
var popupBtn;
const BODY_NODE = document.querySelector("body");

function paint(node){
    node = node.target;
    // if grid is painted
    if (node.classList[0] == "paint"){
        let light = parseFloat(node.style.getPropertyValue("--Light_Value"));
        let touchCount = node.style.getPropertyValue("--Touch_Count");
        touchCount++;
        // 10th touch means it is completely black, so idle
        console.log(touchCount)
        if (touchCount >= 10){
            console.log("remove painting")
            node.classList.remove("paint");
            node.classList.add("idle");
            node.style.setProperty("--Touch_Count", 0);
            return;
        }
        light = light-((light/10)*touchCount) + '%';
        let hue = node.style.getPropertyValue("--Hue_Value");
        let sat = node.style.getPropertyValue("--Sat_Value");
        node.style.setProperty("--Light_Value", light);
        node.style.setProperty("--Random_Color", `hsl(${hue}, ${sat}, ${light})`);
        node.style.setProperty("--Touch_Count", touchCount);
        console.log("current color:" + node.style.getPropertyValue("--Random_Color"));
    }
    else{
        console.log("idle grid")
        node.classList.add("paint");
        node.style.setProperty("--Touch_Count", 1);
        setHSLAndLight(node);
        node.classList.remove("idle");
    }
}

function createGrid(gridIndex){
    for (let i = 0; i < gridIndex*gridIndex; i++){
        let grid = document.createElement("div");
        grid.classList.add("idle");
        grid.style.setProperty("--Grid_Size", ((864/gridIndex)-4) + "px");
        grid.style.setProperty("--Touch_Count", 0);
        grid.addEventListener("mouseover", paint);
        container.appendChild(grid);
    }
}

function deleteGrid(){
    let list = document.querySelectorAll(".idle,.paint");
    console.dir(list)
    list.forEach((child) => {
        container.removeChild(child);
    });
}

function gridMenue(){
    let newGridIndex = prompt("Grid-Size", "16");
    newGridIndex = parseInt(newGridIndex);
    if (newGridIndex < 0 || newGridIndex > 100)
        return;
    deleteGrid();
    createGrid(newGridIndex);
}

function setHSLAndLight(grid){
    let hue = Math.random() * 360 + 1;
    let saturation = (Math.random() * 100 + 1) + '%';
    let ligth = (Math.random() * 100 + 1) + '%';
    grid.style.setProperty("--Random_Color", `hsl(${hue}, ${saturation}, ${ligth})`);
    grid.style.setProperty("--Hue_Value", hue);
    grid.style.setProperty("--Sat_Value", saturation);
    grid.style.setProperty("--Light_Value", ligth);
}

initGridIndex = 16;
// set popup button
popupBtn = document.createElement("button");
popupBtn.textContent = "Create New Grid";
popupBtn.classList.add("popupBtn");
popupBtn.addEventListener("click", gridMenue);
// set the container
container = document.createElement("div")
container.classList.add("container");
// add the grids
createGrid(initGridIndex);
// append stuff to the dom
BODY_NODE.appendChild(popupBtn);
BODY_NODE.appendChild(container);