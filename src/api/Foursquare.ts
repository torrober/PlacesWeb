class Foursquare {
    apikey!: string;
    url: string = "https://api.foursquare.com/v3/places/";
    constructor(api: string) {
        if(api != undefined) {
            this.apikey = api;
        } 
    }
    public async getNearbyPlaces(lat: number, long: number, limit: number) {
        const path = `${this.url}nearby?ll=${lat},${long}&limit=${limit}`;
        const options = {
            headers: {
              Accept: 'application/json',
              Authorization: this.apikey
            }
        };
        const response = await fetch(path,options)
        return response.json();
    }
    public async searchPlaces(query: string, lat: number, long: number){
        const path = `${this.url}search?query=${query}&ll=${lat},${long}&limit=50&radius=5000`;
        const options = {
            headers: {
              Accept: 'application/json',
              Authorization: this.apikey
            }
        };
        const response = await fetch(path,options)
        return response.json();
    }
    public async getPhotos(id: any, limit: number) {
        const path = `${this.url}${id}/photos?limit=${limit}`;
        const options = {
            headers: {
              Accept: 'application/json',
              Authorization: this.apikey
            }
        };
        const response = await fetch(path,options)
        if(response.status != 404) {
            return response.json();
        } else {
            throw(new Error("Response failed, status: " +response.status))
        }
    }
    public async getTips(id: any){
        const path = `${this.url}${id}/tips?`;
        const options = {
            headers: {
              Accept: 'application/json',
              Authorization: this.apikey
            }
        };
        const response = await fetch(path,options)
        return response.json();
    }
}
export default Foursquare;