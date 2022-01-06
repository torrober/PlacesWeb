export enum MapLayer {
    GoogleMaps = "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    GoogleMapsSatelite = "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    OpenStreetMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    Mapbox = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
}