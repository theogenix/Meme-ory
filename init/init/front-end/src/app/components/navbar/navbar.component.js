import "./navbar.component.css";
import template from "./navbar.component.html";


export class NavbarComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = template;
      // ...
    }
  }