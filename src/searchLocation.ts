import "./style.css";
import OpenCage from "./api/OpenCage";
let openCage = new OpenCage(import.meta.env.VITE_OPENCAGE_APIKEY);
document.querySelector(".searchField")!.addEventListener("input", searchPlaces);
function createLi(element: any){
    let li: any = document.createElement("li");
    li.innerText = element.formatted;
    li.setAttribute("lat", element.geometry.lat);
    li.setAttribute("long", element.geometry.lng);
    document.querySelector("#suggestions")!.appendChild(li);
}
function searchPlaces(e: any){
    let value = e.target.value;
    if(value != "") {
        document.querySelector("#suggestions")!.innerHTML = "";
        openCage.forwardGeocoding(value).then((data)=>{
            for (let index = 0; index < data.results.length; index++) {
                const element = data.results[index];
                createLi(element);
            }
        })
    } else {
        document.querySelector("#suggestions")!.innerHTML = "";
    }
}

document.querySelector("#suggestions")!.addEventListener("click", setCoords);

function setCoords(e: any) {
    const selectedValue: any = e.target.attributes;
    const coords = [selectedValue.lat.value, selectedValue.long.value];
    localStorage.setItem("pos", JSON.stringify(coords));
    alert("Location set to: "+e.target.innerText);
    history.back();
}