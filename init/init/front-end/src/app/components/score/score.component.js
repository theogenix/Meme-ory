// TODO #import-html: use ES default imports to import game.html as template
import template from "/web-01/web-01/init/init/front-end/src/app/components/score/score.component.html";
// TODO #export-functions: remove the IIFE
// TODO #export-functions: export function ScoreComponent
// TODO #class: use the ES6 class keyword
/* class ScoreComponent constructor */
import { parseUrl } from "/web-01/web-01/init/init/front-end/src/app/scripts/utils";
import { Component } from "/web-01/web-01/init/init/front-end/src/app/scripts/component";
import "./score.component.scss";
export class ScoreComponent extends Component {
  constructor() {
    // TODO #extends: call super(template)
    const params = parseUrl();
    // TODO #import-html: assign template to this.template
    super(template);
    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }


  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.

  // TODO #class: turn function into a method of ScoreComponent
  /* method ScoreComponent.init */
  init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  };
}
