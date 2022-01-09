import Foursquare from "./api/Foursquare";
import PlaceElement from "./customElements/PlaceElement";
import { Place } from "./objects/Place";
import { PlaceType } from "./objects/PlaceType";
import "./style.css";
const fsq = new Foursquare(import.meta.env.VITE_FOURSQUARE_APIKEY);
window.onload = () => {
    let places: any = localStorage.getItem("fav");
    if (places != "null") {
        places = JSON.parse(places)
        for (let index = 0; index < places.length; index++) {
            const element = places[index];
            fsq
                .getPlace(element)
                .then((data) => {
                    try {
                        addPlaces(data);
                    } catch { 
                        console.log("error");
                    }
                })
        }
    } else {
        document.querySelector(".favorites")!.innerHTML = "No favorites found";
    }
}
function addPlaces(data: any) {
    const element = data;
    const place = new Place(
        element.fsq_id,
        element.name,
        element.geocodes.main.latitude,
        element.geocodes.main.longitude,
        element.location.address,
        element.location.locality,
        element.location.region,
        element.location.country
    );
    //place.placeType
    for (let i = 0; i < element.categories.length; i++) {
        const cat = element.categories[i];
        place.placeType = new PlaceType(
            cat.id,
            cat.icon.prefix + "512" + cat.icon.suffix,
            cat.name
        );
    }
    let placeElement = <PlaceElement>document.createElement('place-element');
    placeElement.lat = place.lat;
    placeElement.long = place.long;
    placeElement.name = place.name;
    placeElement.placeType = place.placeType.name;
    placeElement.icon = place.placeType.icon;
    placeElement.setAttribute("lat", "" + place.lat);
    placeElement.setAttribute("long", "" + place.long);
    placeElement.setAttribute("id", place.id);
    placeElement.setAttribute("name", place.name);
    placeElement.setAttribute("placeType", place.placeType.name)
    placeElement.setAttribute("icon", place.placeType.icon)
    document.querySelector(".favorites")!.appendChild(placeElement);
}
window.customElements.define('place-element', PlaceElement);