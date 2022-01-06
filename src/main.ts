import "./style.css";
import Foursquare from "./api/Foursquare";
import { Place } from "./objects/Place";
import { PlaceType } from "./objects/PlaceType";
import { Map } from "./objects/Map";
import { MapLayer } from "./objects/MapLayer";
import PlaceElement from "./customElements/PlaceElement";
import PlaceCard from "./customElements/PlaceCard";
import getMapLayer from "./utils/MapLayerParser";
import CoordsUtils from "./utils/CoordsUtils";
const fsq = new Foursquare(import.meta.env.VITE_FOURSQUARE_APIKEY);
//map settings
let map = new Map();
map.setMapboxToken(import.meta.env.VITE_MAPBOX_ACCESSTOKEN);
let places: Place[] = [];
let coords: any;

if (localStorage.getItem("pos") == null) {
  map.init(4, -72, "map", MapLayer.Mapbox);
  navigator.geolocation.getCurrentPosition(init, errorFunction);
  localStorage.setItem("mapLayer", "3");
} else {
  coords = localStorage.getItem("pos");
  coords = JSON.parse(coords);
  const mapLayer: any = getMapLayer(Number(localStorage.getItem("mapLayer")))
  map.init(coords[0], coords[1], "map", mapLayer);
}

document.getElementById("search")!.addEventListener("change", inputHandler);
window.onclick = (e: any) => {
  if (e.target.localName == "place-element") {
    let id = e.target.attributes.id.value;
    let newCoords = [e.target!.attributes[0].value,e.target!.attributes[1].value];
    map.removeMarkers();
    map.setMarker(newCoords[0],newCoords[1]);
    localStorage.setItem("pos", JSON.stringify(newCoords));
    flyTo(Number(e.target!.attributes[0].value), Number(e.target!.attributes[1].value));
    document.getElementById("recentPlaces")!.style.display = "none";
    document.getElementById("selectedPlace")!.innerHTML = "";
    fsq.getPhotos(id, 1).then((data) => {
      const imgUrl = data[0].prefix + "original" + data[0].suffix;
      let selectedPlaceCard = createPlaceCard(imgUrl, e, id);
      document.getElementById("selectedPlace")!.appendChild(selectedPlaceCard);
      document.getElementById("selectedPlace")!.style.display = "block";
    }).catch(() => {
      const imgUrl = e.target!.attributes.icon.value;
      let selectedPlaceCard = createPlaceCard(imgUrl, e, id);
      document.getElementById("selectedPlace")!.appendChild(selectedPlaceCard);
      document.getElementById("selectedPlace")!.style.display = "block";
    })
  }
};
function createPlaceCard (imgUrl: string, e: any, id: string) {
  let selectedPlaceCard = <PlaceCard>document.createElement("place-card");
  selectedPlaceCard.name = e.target.attributes.name.value;
  selectedPlaceCard.cover = imgUrl;
  selectedPlaceCard.lat = e.target!.attributes[0].value;
  selectedPlaceCard.long = e.target!.attributes[1].value;
  selectedPlaceCard.id = id;
  selectedPlaceCard.placeType = e.target!.attributes.placeType.value;
  return selectedPlaceCard;
}
function init(position: any) {
  if (localStorage.getItem("pos") == null) {
    localStorage.setItem(
      "pos",
      JSON.stringify([position.coords.latitude, position.coords.longitude])
    );
  }
  map.flyTo(position.coords.latitude, position.coords.longitude, 15);
}
function addPlaces(data: any) {
  const length = data.results.length;
  const res = data.results;
  document.getElementById("recentPlaces")!.innerHTML = "";
  document.getElementById("selectedPlace")!.innerHTML = "";
  for (let index = 0; index < length; index++) {
    const element = res[index];
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
    document.getElementById("recentPlaces")!.appendChild(placeElement);
    document.getElementById("recentPlaces")!.style.display = "block";
    places.push(place);
  }
}
function errorFunction() {
  localStorage.setItem("pos", JSON.stringify([4,-72]))
}
function addMarkers(places: Place[]) {
  for (var place of places) {
    map.setMarker(place.lat, place.long);
  }
}

function inputHandler(e: any) {
  let searchquery = e.target.value;
  places = [];
  let coordsSearch = searchquery.split(",");
  if(searchquery !=""){
    map.removeMarkers();
    if(CoordsUtils.checkCoords(coordsSearch[0],coordsSearch[1])){
      map.flyTo(coordsSearch[0],coordsSearch[1], 17);
      map.setMarker(coordsSearch[0],coordsSearch[1]);
      localStorage.setItem("pos", JSON.stringify(coordsSearch));
      coords = coordsSearch;
    } else {
      fsq
      .searchPlaces(searchquery, coords[0], coords[1])
      .then((data) => {
        addPlaces(data);
      })
      .then(() => {
        addMarkers(places);
        map.setZoom(13);
      });
    }
  }
}

function flyTo(lat: number, long: number): any {
  map.flyTo(lat, long, 17);
}
window.addEventListener("storage", () => {
  const mapLayer: any = getMapLayer(Number(localStorage.getItem("mapLayer")));
  document.querySelector(".leaflet-tile-pane")!.innerHTML="";
  map.setMapLayer(mapLayer);
  coords = localStorage.getItem("pos");
  coords = JSON.parse(coords);
  flyTo(coords[0], coords[1]);
  map.setMarker(coords[0], coords[1]);
  document.getElementById("recentPlaces")!.innerHTML = "";
  document.getElementById("selectedPlace")!.innerHTML = "";
})
window.customElements.define('place-element', PlaceElement);
window.customElements.define('place-card', PlaceCard);