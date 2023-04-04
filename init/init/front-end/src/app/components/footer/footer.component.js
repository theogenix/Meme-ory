import "./footer.component.scss";
import template from "./footer.component.html";

export class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = template;
    // ...
  }
}