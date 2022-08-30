// set the container
const CONTAINER = document.createElement("div");
CONTAINER.setAttribute("id", "container");
CONTAINER.style.display = "flex";
CONTAINER.style.justifyContent = "flex-start";
CONTAINER.style.alignContent = "flex-start";
CONTAINER.style.flexWrap = "wrap";
CONTAINER.style.width = "864px";
CONTAINER.style.height = "864px";
// add the grids
for (let i = 0; i < 16*16; i++){
    let grid = document.createElement("div");
    grid.classList.add("idle");
    grid.addEventListener("mouseover", g => {
        console.log(g.target);
        g.target.classList.add("paint");
        g.target.classList.remove("idle");
    });
    CONTAINER.appendChild(grid);
}
// append it to the dom
document.querySelector("body").appendChild(CONTAINER);