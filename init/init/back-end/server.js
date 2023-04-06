import { config } from "./config.js";
import _ from "lodash";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

swaggerJSDoc(config.swagger).then((specs) =>
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
);

const scores = [];
scores.push({
  name: "Alexis",
  time: _.random(999, true),
  size: _.random(0, 12),
});
scores.push({
  name: "Nicolas",
  time: _.random(999, true),
  size: _.random(0, 12),
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/board", (req, res) => {
  const size = req.query.size && parseInt(req.query.size);

  if (!size) {
    return res.status(400).send('Missing parameter "size"');
  }

  res.json({ ids: _.shuffle([...Array(size).keys(), ...Array(size).keys()]) });
});

app.post("/scores", (req, res) => {
  const size = req.body.size && parseInt(req.body.size);
  const time = req.body.time && req.body.time;
  const name = req.body.name;

  if (!size || !name || !time) {
    return res
      .status(400)
      .send("Missing parameter, size, name and time are required");
  }

  scores.push({ size, name, time });

  res.status(201).end();
});

app.get("/scores", (req, res) => {
  const size = req.query.size && parseInt(req.query.size);
  const name = req.query.name;

  let filteredScores = scores;
  if (size) {
    filteredScores = filteredScores.filter((score) => score.size === size);
  }
  if (name) {
    filteredScores = filteredScores.filter((score) => score.name === name);
  }

  res.json(filteredScores);
});

app.listen(config.port, () => {
  console.log(
    chalk.bold.green(
      `*****************
Meme-ory app started up!
*****************
`
    )
  );
  console.log(
    `Check out the OpenAPI server documentation at the following address:`
  );
  console.log(
    chalk.blue.bold(`       http://${config.host}:${config.port}/api-docs/`)
  );
});
