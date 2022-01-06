import { MapLayer } from "../objects/MapLayer";

export default function getMapLayer(value: any) {
    switch(value){
        case 0:
            return MapLayer.GoogleMaps
        case 1:
            return MapLayer.GoogleMapsSatelite
        case 2:
            return MapLayer.OpenStreetMap
        case 3:
            return MapLayer.Mapbox;
        default:
            return null;
    }
}