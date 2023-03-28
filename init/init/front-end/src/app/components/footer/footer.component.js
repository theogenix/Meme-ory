import "./footer.component.css";
import template from "./footer.component.html";



export class FooterComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = template;
      // ...
    }
  }