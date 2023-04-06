import template from "./score.component.html";
import { parseUrl } from "../../scripts/utils";
import { Component } from "../../scripts/component";
import "./score.component.scss";
import { getScores } from "./getScores";

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
    getScores()
      .then((scores) => {
        const scoresArray = scores.map((score, index) => ({
          ...score,
          index: index + 1,
        }));
        scoresArray.sort((a, b) => a.time - b.time);
        const tbody = document.querySelector("#high-scores-table tbody");
        tbody.innerHTML = "";
        scoresArray.forEach((score, index) => {
          const row = document.createElement("tr");
          const rankCell = document.createElement("td");
          const nameCell = document.createElement("td");
          const timeCell = document.createElement("td");
          const sizeCell = document.createElement("td");

          rankCell.textContent = index + 1;
          nameCell.textContent = score.name;
          timeCell.textContent = score.time;
          sizeCell.textContent = score.size;

          row.appendChild(rankCell);
          row.appendChild(nameCell);
          row.appendChild(timeCell);
          row.appendChild(sizeCell);

          tbody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
