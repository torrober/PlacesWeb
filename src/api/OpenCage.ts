export default class OpenCage {
    apikey!:string
    constructor(apikey: string){
        this.apikey = apikey
    }
    public async forwardGeocoding(query: string){
        const path = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${this.apikey}`;
        const response = await fetch(path)
        return response.json();
    }
    public async reverseGeocoding(lat: number, long: number){
        const path = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${this.apikey}`
        const response = await fetch(path)
        return response.json();
    }
}