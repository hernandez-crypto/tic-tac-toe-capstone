const express = require('express');
const GamesService = require('./games-service');
const { requireAuth } = require('../middleware/jwt-auth');
const gamesRouter = express.Router();
const path = require('path');
const jsonBodyParser = express.json();

gamesRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { game_room } = req.body;
    GamesService.CreateNewGame(req.app.get('db'), req.user.id, game_room)
      .then(board => {
        res.json({ board }, 200).end();
      })
      .catch(next);
  });

gamesRouter
  .route('/:game_id')
  .all(requireAuth)
  .all(checkGameExists)
  .get((req, res, next) => {
    GamesService.RespondWithCurrentGame(req.app.get('db'), req.params.game_id)
      .then(board => {
        res.json(board);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    GamesService.inserSecondPlayerIntoGame(
      req.app.get('db'),
      req.params.game_id,
      req.user.id
    )
      .then(board => {
        res.json(board);
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    //this is where the app should check if the user.id is either the second player or first player in the knex game_room instance
    GamesService.UpdateCurrentGame(
      req.app.get('db'),
      req.body.game_room,
      req.body.board
    )
      .then(game => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${game.id}`))
          .json(game);
      })
      .catch(next);
  });

async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.RespondWithCurrentGame(
      req.app.get('db'),
      req.params.game_id
    );

    if (!game)
      return res.status(404).json({
        error: `Game doesn't exist`,
      });

    res.game = game;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = gamesRouter;
