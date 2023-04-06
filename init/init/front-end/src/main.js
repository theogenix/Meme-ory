import { Router } from "./app/scripts/router";
import { GameComponent } from "./app/components/game/game.component";
import { ScoreComponent } from "./app/components/score/score.component";
import { WelcomeComponent } from "./app/components/welcome/welcome.component";
import { NavbarComponent } from "./app/components/navbar/navbar.component";
import { FooterComponent } from "./app/components/footer/footer.component";
import "./app/styles/style.scss";
const outlet = document.querySelector("#content-outlet");
const router = new Router(outlet);
customElements.define("my-navbar", NavbarComponent);
customElements.define("my-footer", FooterComponent);
router
  .register("", {
    component: WelcomeComponent,
  })
  .register("welcome", {
    component: WelcomeComponent,
  })
  .register("game", {
    component: GameComponent,
  })
  .register("score", {
    component: ScoreComponent,
  });
