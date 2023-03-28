// TODO #import-html: use ES default imports to import welcome.html as template
import template from "/web-01/web-01/init/init/front-end/src/app/components/welcome/welcome.component.html"
//import template from "../views/welcome.html";
// TODO #export-functions: remove the IIFE
// TODO #export-functions: export function WelcomeComponent
// TODO #class: use the ES6 class keyword
/* class WelcomeComponent constructor  */
import { Component } from "/web-01/web-01/init/init/front-end/src/app/scripts/component";
import "./welcome.component.css";
export class WelcomeComponent extends Component {
  constructor(){
    super(template)
  }
  // TODO #extends: call super(template)

  // TODO #import-html: assign template to this.template

// TODO #export-functions: remove this line
// put component in global scope, to be runnable right from the HTML.
// TODO #class: turn function into a method of WelcomeComponent
/* method WelcomeComponent.init */
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
        // TODO #template-literals:  use template literals (backquotes)
        window.location = `${gamePage}?name=${name}&size=${size}`;
      }
    },
    false
  );

  return this;
};
}
// TODO #class: turn function into a method of WelcomeComponent
