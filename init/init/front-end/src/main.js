// TODO #import-router: use ES named imports to import the router
import { Router } from "./app/scripts/router";
// TODO #import-components: use ES named imports to import WelcomeComponent, GameComponent a ScoreComponent
import { GameComponent } from "./app/scripts/game";
import { ScoreComponent } from "./app/scripts/score";
import { WelcomeComponent } from "./app/scripts/welcome";
// TODO #import-css: use ES side-effect imports to import styles/style.css
import "bootstrap/dist/css/bootstrap.css";
import "./app/styles/style.css";
const outlet = document.querySelector("#content-outlet");
const router = new Router(outlet);
router
  .register("", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
  })
  .register("welcome", {
    component: WelcomeComponent,
    // TODO #import-html: remove the templateUrl property.
  })
  .register("game", {
    component: GameComponent,
    // TODO #import-html: remove the templateUrl property.
  })
  .register("score", {
    component: ScoreComponent,
    // TODO #import-html: remove the templateUrl property.
  });
