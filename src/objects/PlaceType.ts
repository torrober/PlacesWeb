export class PlaceType {
    id!: number;
    icon!: string;
    name!: string;
    constructor(id: number, icon: string, name: string){
        this.id = id;
        this.icon = icon;
        this.name = name;
    }
}