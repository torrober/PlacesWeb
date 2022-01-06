import * as L from "leaflet";
import { MapLayer } from "./MapLayer";
export class Map {
  map: any;
  _mapLayer!: MapLayer;
  markers: any = [];
  private _mapboxToken: string = "";
  constructor() { }
  public init(lat: number, long: number, divID: string, layer: MapLayer) {
    this.map = L.map(divID, { zoomControl: false }).setView([lat, long], 15);
    if (layer == MapLayer.Mapbox && this._mapboxToken == "") {
      throw new Error("Please set Mapbox accessToken, otherwise it won't work.")
    } else {
      this.setMapLayer(layer)
    }
  }
  public getMapboxToken(): string {
    return this._mapboxToken;
  }
  public setMapboxToken(value: string) {
    this._mapboxToken = value;
  }
  public getMapLayer(): MapLayer {
    return this._mapLayer;
  }
  public setMapLayer(value: MapLayer) {
    this._mapLayer = value;
    switch (value) {
      case MapLayer.GoogleMaps:
        L.tileLayer(MapLayer.GoogleMaps, {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          attribution:
            '&copy; <a href="https://www.maps.google.com">Google Maps</a>',
        }).addTo(this.map);
        break;
      case MapLayer.GoogleMapsSatelite:
        L.tileLayer(MapLayer.GoogleMapsSatelite, {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          attribution:
            '&copy; <a href="https://www.maps.google.com">Google Maps</a>',
        }).addTo(this.map);
        break;
      case MapLayer.Mapbox:
        L.tileLayer(
          MapLayer.Mapbox,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: this._mapboxToken,
          }
        ).addTo(this.map);
        break;
      case MapLayer.OpenStreetMap:
        L.tileLayer(MapLayer.OpenStreetMap, {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        break;
    }
  }
  public flyTo(lat: number, long: number, zoomSize: number) {
    this.map.flyTo([lat, long], zoomSize);
  }
  public setMarker(lat: number, long: number) {
    const marker = L.marker([lat, long]).addTo(this.map);
    this.markers.push(marker);
  }
  public removeMarkers() {
    for (let index = 0; index < this.markers.length; index++) {
      const element = this.markers[index];
      this.map.removeLayer(element);
    }
    this.markers = []
  }
  public setZoom(zoomLevel: number) {
    this.map.setZoom(zoomLevel);
  }
}
