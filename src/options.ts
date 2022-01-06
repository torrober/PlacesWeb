import "./style.css";
import CoordsUtils from "./utils/CoordsUtils";
let mapLayer: any = localStorage.getItem("mapLayer");
const select: any = document.querySelector("#mapLayer");
const coordsInput: any = document.getElementById("location")!;
window.onload = () => {
    let coords: any = localStorage.getItem("pos");
    coords = JSON.parse(coords);
    coordsInput.value = coords;
    for (let index = 0; index < select.length; index++) {
        if(index.toString() == mapLayer){
            select[index].setAttribute("selected", "");
        }
    }
}
const saveChanges = () => {
    let location: any = document.querySelector("#location");
    location = location.value.split(",");
    if(CoordsUtils.checkCoords(location[0], location[1])){
        localStorage.setItem("mapLayer", select.value);
        localStorage.setItem("pos", JSON.stringify(location));
    } else {
        alert("Please enter valid coordinates")
    }
}


document.querySelector("#save")!.addEventListener("click", () => {saveChanges()});