import template from "/web-01/web-01/init/init/front-end/src/app/components/welcome/welcome.component.html"
import { Component } from "/web-01/web-01/init/init/front-end/src/app/scripts/component";
import "./welcome.component.scss";
export class WelcomeComponent extends Component {
  constructor() {
    super(template)
  }
  init() {
    const form = document.querySelector("form.form-signin");
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          const name = event.srcElement.querySelector("#nickname").value;
          const size = parseInt(event.srcElement.querySelector("#size").value);
          const gamePage = "./#game";
          window.location = `${gamePage}?name=${name}&size=${size}`;
        }
      },
      false
    );
    return this;
  };
}