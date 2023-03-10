// TODO #import-html: use ES default imports to import game.html as template
import template from "../views/score.html";
// TODO #export-functions: remove the IIFE
// TODO #export-functions: export function ScoreComponent
// TODO #class: use the ES6 class keyword
/* class ScoreComponent constructor */
import { parseUrl } from "./utils";
import { Component } from "./component";
export class ScoreComponent extends Component {
  constructor() {
    // TODO #extends: call super(template)
    var params = parseUrl();
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
