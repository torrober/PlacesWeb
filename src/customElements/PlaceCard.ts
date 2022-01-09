import FavUtils from "../utils/FavUtils";

export default class PlaceCard extends HTMLElement {
    name!: string;
    root: ShadowRoot;
    placeType!: string;
    id!: string;
    cover!: string;
    lat!: number;
    long!: number;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }
    checkFav(id: string) {
        return FavUtils.checkFav(id);
    }
    connectedCallback() {
        this.root.innerHTML = `
        <style>
            .card{
                padding: 10px;
                background: white;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .card-header {
                height: 30vh;
                border-radius: 10px;
                margin-top: 10px;
                margin-bottom: 10px;
                background: rgba(45, 91, 227,1) url(${this.cover}) no-repeat center;
                background-size: cover;
            }
            .card-heading {
                font-size: x-large;
            }
            .parent {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 1fr;
                grid-column-gap: 0px;
                grid-row-gap: 0px;
                text-align: center;
            }
            .div1 { grid-area: 1 / 1 / 2 / 2; }
            .div2 { grid-area: 1 / 2 / 2 / 3; }
            .div3 { grid-area: 1 / 3 / 2 / 4; }
            .icon {
                font-family: 'FontAwesome';
                user-select: none;
                color: white;
                background: rgba(45, 91, 227,1);
                margin: 10px;
                padding: 30px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 100;
                text-decoration: none;
            }
            a {
                text-decoration: none;
            }            
        </style>
        <div class="wrapper">
            <div class="card">
                <div class="card-header"></div>
                <b class="card-heading">${this.name}</b>
                <br>
                <span>${this.placeType}</span>
            </div>
            <div class="card">
                    <div class="parent">
                        <div class="div1"> 
                            <a href ="https://foursquare.com/v/${this.id}" target="_blank"><h1 class="icon">&#xf180</h1></a>
                            <span>View on Foursquare</span>
                        </div>
                        <div class="div2">
                            <a href="https://maps.google.com/maps?daddr=${this.lat},${this.long}" target="_blank"><h1 class="icon">&#xf14e</h1></a>
                            <span>Get directions</span>
                        </div>
                        <div class="div3" id="fav" data-id="${this.id}">
                            <h1 class="icon">&#xf005</h1>
                            <span id="favText">${this.checkFav(this.id)? "Remove from favorites" : "Add to favorites"}</span>
                        </div>
                    </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css" />
        `
    }
}