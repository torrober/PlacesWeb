export default class PlaceElement extends HTMLElement {
  root: ShadowRoot;
  long!: number;
  lat!: number;
  name!: string;
  placeType: any;
  icon: any;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.root.innerHTML = `
    <style>
        #left { grid-area: 1 / 1 / 2 / 2; }
        #right { grid-area: 1 / 2 / 2 / 3; text-align: center;}
        .place-icon{
            width: 50px;
            height: 50px;
            background-color:  rgba(45, 91, 227,1);
            border-radius: 50%;
            padding: 10px;
            user-select: none;
        }
    </style>
        <div id="left">
            <b>${this.name}</b>
            <br>
            <span>${this.placeType}</span>
        </div>
        <div id="right">
            <img src="${this.icon}" class="place-icon" draggable="false">
        </div>
    `;
  }
}
