import { PlaceType } from "./PlaceType";

export class Place {
    public id!: string;
    public lat!: number;
    public long!: number;
    public name!: string;
    public address!: string;
    public locality!: string;
    public region!: string;
    public country!: string;
    public placeType: any = new PlaceType(0, "https://ss3.4sqi.net/img/categories_v2/travel/hotel_512.png", "Place");
    constructor(id: string, name: string ,lat: number, long: number, address: string, locality: string, region: string, country: string) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.long = long;
        this.address = address;
        this.locality = locality;
        this.region = region;
        this.country = country;
    }
}
