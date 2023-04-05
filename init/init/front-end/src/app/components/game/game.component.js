import template from "./game.component.html";
import { Component } from "/web-01/web-01/init/init/front-end/src/app/scripts/component";
import "./game.component.scss";
import { CardComponent } from "./card/card.component";
import { parseUrl } from "/web-01/web-01/init/init/front-end/src/app/scripts/utils";

let environment = {
  api: {
    host: "http://localhost:8081",
  },
};
export class GameComponent extends Component {

  constructor() {
    super(template)
    // gather parameters from URL
    let params = parseUrl();
    this.template = template;
    // save player name & game size
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._flippedCardIndex = null;
    this._matchedPairs = 0;
  }

  async init() {
    // fetch the cards configuration from the server
    this._config = await this.fetchConfig(
      (config) => {
        this._config = config;
        this._boardElement = document.querySelector(".cards");

        // create cards out of the config
        this._cards = [];

        let savedCards = JSON.parse(localStorage.getItem('cards')) || [];
        let savedFlippedCard = localStorage.getItem("flippedCard") != null ? parseInt(localStorage.getItem("flippedCard")) : null;
        this._matchedPairs = parseInt(localStorage.getItem("matchedPairs")) || 0;

        if (savedCards && savedCards.length === this._config.ids.length) {
          console.log(savedCards)
          this._cards = savedCards.map((card, index) => {
            return new CardComponent(card._id, card);
          });
        } else {
          this._cards = this._config.ids.map(element => new CardComponent(element));
        }

        this._flippedCard = this._cards[savedFlippedCard];

        this._cards.forEach(card => {
          this._boardElement.appendChild(card.getElement());
          card.getElement().addEventListener(
            "click",
            () => {
              this._flipCard(card);
            }
          );
        });
        this.start();
      }
    );
  };

  _appendCard(card) {
    this._boardElement.appendChild(card.getElement());
    card.getElement().addEventListener(
      "click",
      () => {
        this._flipCard(card);
      }

    );
  };

  start() {
    this._startTime = Date.now();
    let seconds = parseInt(localStorage.getItem("time")) || 0;
    document.querySelector("nav .navbar-title").textContent =
      `Player: ${this._name}.Elapsed time: ${seconds++}`;

    this._timer = setInterval(
      () => {
        localStorage.setItem("time", seconds++);
        document.querySelector("nav .navbar-title").textContent =
          `Player: ${this._name}.Elapsed time: ${localStorage.getItem("time")}`;
      },
      1000
    );
  };

  async fetchConfig(cb) {
    let xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("get", `${environment.api.host}/board?size=${this._size}`, true);
    xhr.onreadystatechange = () => {
      let status;
      let data;
      if (xhr.readyState == 4) {
        // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          cb(data);
        } else {
          throw new Error(status);
        }
      }
    };
    xhr.send();
  };
  gotoScore() {
    let timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(
      () => {
        let scorePage = "./#score";
        window.location = `${scorePage}?name=${this._name}&size=${this._size}&time=${localStorage.getItem("time")}`
        localStorage.clear();
      },
      750
    );
  };
  _flipCard(card) {
    if (this._busy) {
      return;
    }
    if (card.flipped) {
      return;
    }
    // flip the card
    card.flip();
    // if flipped first card of the pair
    if(this._flippedCard === null || this._flippedCard === undefined || this._flippedCard === NaN || this._flippedCard === "" || this._flippedCard === false) {
      // keep this card flipped, and wait for the second card of the pair si égale à nulle ou vide.
      this._flippedCard = card;
      this._flippedCardIndex = this._cards.indexOf(card);
    } else {
      // second card of the pair flipped...
      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;
        // reset flipped card for the next turn.
        this._flippedCard = null;
        this._flippedCardIndex = null;
        if (this._matchedPairs === this._size) {
          this.gotoScore();
        }
      } else {
        this._busy = true;
        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(() => {
          // hide the cards
          this._flippedCard.flip();
          card.flip();
          this._busy = false;
          // reset flipped card for the next turn.
          this._flippedCard = null;
          this._flippedCardIndex = null;
          localStorage.setItem("cards", JSON.stringify(this._cards));
          localStorage.setItem("matchedPairs", this._matchedPairs);
          if (this._flippedCardIndex !=null){
            //si pas égale à nulle
            localStorage.setItem("flippedCard", this._flippedCardIndex);
          } else {
            localStorage.removeItem("flippedCard");
          }
        }, 500);
      }
    }
    localStorage.setItem("cards", JSON.stringify(this._cards));
    localStorage.setItem("matchedPairs", this._matchedPairs);
    if (this._flippedCardIndex !=null) {
      localStorage.setItem("flippedCard", this._flippedCardIndex);
    } else {
      localStorage.removeItem("flippedCard");
    }
  }
}

