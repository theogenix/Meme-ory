import template from "./game.component.html";
import { Component } from "../../scripts/component";
import "./game.component.scss";
import { CardComponent } from "./card/card.component";
import { parseUrl } from "../../scripts/utils";

let environment = {
  api: {
    host: "http://localhost:8081",
  },
};

export class GameComponent extends Component {
  constructor() {
    super(template);
    let params = parseUrl();
    this.template = template;
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._flippedCardIndex = null;
    this._matchedPairs = 0;
  }

  async init() {
    this._config = await this.fetchConfig((config) => {
      this._config = config;
      this._boardElement = document.querySelector(".cards");
      this._cards = [];

      let savedCards = JSON.parse(localStorage.getItem("cards")) || [];
      let savedFlippedCard =
        localStorage.getItem("flippedCard") != null
          ? parseInt(localStorage.getItem("flippedCard"))
          : null;
      this._matchedPairs = parseInt(localStorage.getItem("matchedPairs")) || 0;

      if (savedCards && savedCards.length === this._config.ids.length) {
        this._cards = savedCards.map((card, index) => {
          return new CardComponent(card._id, card);
        });
      } else {
        this._cards = this._config.ids.map(
          (element) => new CardComponent(element)
        );
      }

      this._flippedCard = this._cards[savedFlippedCard];

      this._cards.forEach((card) => {
        this._boardElement.appendChild(card.getElement());
        card.getElement().addEventListener("click", () => {
          this._flipCard(card);
        });
      });
      this.start();
    });
  }

  _appendCard(card) {
    this._boardElement.appendChild(card.getElement());
    card.getElement().addEventListener("click", () => {
      this._flipCard(card);
    });
  }

  start() {
    this._startTime = Date.now();
    let seconds = parseInt(localStorage.getItem("time")) || 0;
    document.querySelector("nav .navbar-title").textContent = `Player: ${
      this._name
    }.Elapsed time: ${seconds++}`;

    this._timer = setInterval(() => {
      localStorage.setItem("time", seconds++);
      localStorage.setItem("name", this._name);
      localStorage.setItem("size", this._size);
      document.querySelector("nav .navbar-title").textContent = `Player: ${
        this._name
      }.Elapsed time: ${localStorage.getItem("time")}`;
    }, 1000);
  }

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
  }
  gotoScore() {
    let timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(() => {
      let scorePage = "./#score";
      window.location = `${scorePage}?name=${this._name}&size=${
        this._size
      }&time=${localStorage.getItem("time")}`;
      localStorage.clear();
    }, 750);

    fetch("http://localhost:8081/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: localStorage.getItem("name"),
        time: localStorage.getItem("time"),
        size: localStorage.getItem("size"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du score");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du score:", error);
      });
  }
  _flipCard(card) {
    if (this._busy) {
      return;
    }
    if (card.flipped) {
      return;
    }
    card.flip();
    if (
      this._flippedCard === null ||
      this._flippedCard === undefined ||
      this._flippedCard === NaN ||
      this._flippedCard === "" ||
      this._flippedCard === false
    ) {
      this._flippedCard = card;
      this._flippedCardIndex = this._cards.indexOf(card);
    } else {
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;
        this._flippedCard = null;
        this._flippedCardIndex = null;
        if (this._matchedPairs === this._size) {
          this.gotoScore();
        }
      } else {
        this._busy = true;
        setTimeout(() => {
          this._flippedCard.flip();
          card.flip();
          this._busy = false;
          this._flippedCard = null;
          this._flippedCardIndex = null;
          localStorage.setItem("cards", JSON.stringify(this._cards));
          localStorage.setItem("matchedPairs", this._matchedPairs);
          if (this._flippedCardIndex != null) {
            localStorage.setItem("flippedCard", this._flippedCardIndex);
          } else {
            localStorage.removeItem("flippedCard");
          }
        }, 500);
      }
    }
    localStorage.setItem("cards", JSON.stringify(this._cards));
    localStorage.setItem("matchedPairs", this._matchedPairs);
    if (this._flippedCardIndex != null) {
      localStorage.setItem("flippedCard", this._flippedCardIndex);
    } else {
      localStorage.removeItem("flippedCard");
    }
  }
}
