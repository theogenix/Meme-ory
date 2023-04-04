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
    const params = parseUrl();
    super(template);
    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }
  init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  };
}
