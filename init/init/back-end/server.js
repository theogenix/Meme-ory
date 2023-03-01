import {config} from './config.js';
import _ from 'lodash';
import chalk from 'chalk';

// express
import express from 'express';
import cors from 'cors';

// swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

swaggerJSDoc(config.swagger)
.then(specs => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)))

const scores = [];

// populate scores with random scores
scores.push({name: 'Alexis', time: _.random(999, true), size: _.random(0, 12)});
scores.push({name: 'Nicolas', time: _.random(999, true), size: _.random(0, 12)});

// used to parse body request
app.use(express.json())

app.use(cors({
   origin: "*"
}));

/**
 * @swagger
 * /board:
 *    get:
 *      summary: generates a new meme-ory game board
 *      description: Return pairs of shuffled card ids
 *      parameters:
 *        - in: query
 *          name: size
 *          schema:
 *            type: integer
 *          required: true
 *          description: "Size (ie: amount of card) of the generated board"
 *      responses:
 *        - '200':
 *          description: game board generated
 *          content:
 *            application/json:
 *        - '400':
 *          description: the parameter 'size' is missing
 */

/**
 *
 * @nb nbImages number of images in your project
 * @size boardSize the board size
 */
app.get('/board', (req, res) => {
    const size = req.query.size && parseInt(req.query.size);

    if (!size) {
        return res.status(400).send('Missing parameter "size"')
    }

    res.json({'ids': _.shuffle([...Array(size).keys(), ...Array(size).keys()])});
});

/**
 * @swagger
 * /scores:
 *    post:
 *      summary: Post score for a player
 *      description: Save player's score on the server.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: score
 *          required: true
 *          description: The score to create.
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - time
 *              - size
 *            properties:
 *              name:
 *                type: string
 *                example: Toast
 *              time:
 *                type: number
 *                example: 5.12
 *              size:
 *                type: integer
 *                example: 12
 *      responses:
 *        - '201':
 *          description: Score saved
 *        - '400':
 *          description: one parameter was missing.
 */

/**
 *
 * @nb nbImages number of images in your project
 * @size boardSize the board size
 * @time time player spend to resolve the game
 * @name player name
 */
app.post('/scores', (req, res) => {
    const size = req.body.size && parseInt(req.body.size);
    const time = req.body.time && (req.body.time);
    const name = req.body.name;

    if (!size || !name || !time) {
        return res.status(400).send('Missing parameter, size, name and time are required');
    }

    scores.push({size, name, time});

    res.status(201).end();
});



/**
 * @swagger
 * /scores:
 *    get:
 *      summary: Get all saved scores
 *      description: return a json of all scores saved
 *      parameters:
 *        - in: query
 *          name: size
 *          schema:
 *            type: integer
 *          required: false
 *          description: "Size (ie: amount of card) of the generated board."
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          required: false
 *          description: "Name of the player."
 *      responses:
 *        - '200':
 *          content:
 *            application/json:
 *          description: List returned
 *        - '400':
 *          description: One paramater was not well set.
 */

/**
 *
 * @nb nbImages number of images in your project
 * @size boardSize the board size
 */
app.get('/scores', (req, res) => {
    const size = req.query.size && parseInt(req.query.size);
    const name = req.query.name;

    let filteredScores = scores;
    if (size) {
        filteredScores = filteredScores.filter(score => score.size === size);
    }
    if (name) {
        filteredScores = filteredScores.filter(score => score.name === name);
    }

    res.json(filteredScores);
});



app.listen(config.port, () => {
    console.log(chalk.bold.green(
`*****************
Meme-ory app started up!
*****************
`));
    console.log(`Check out the OpenAPI server documentation at the following address:`);
    console.log(chalk.blue.bold(`       http://${config.host}:${config.port}/api-docs/`));
});
