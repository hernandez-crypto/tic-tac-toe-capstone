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
        res.json({ board, pOneId: 1 }, 200).end();
      })
      .catch(next);
  });

gamesRouter
  .route('/:game_id')
  .all(requireAuth)
  .all(checkGameExists)
  .get((req, res, next) => {
    //route used when game initially created and when posting new moves
    GamesService.RespondWithCurrentGame(req.app.get('db'), req.params.game_id)
      .then(board => {
        res.json(board);
      })
      .catch(next);
  });

gamesRouter
  .route('/:game_id/:second_player_id')
  .all(requireAuth)
  .all(checkGameExists) // second player route
  .get((req, res, next) => {
    console.log('second player route used', req.params.second_player_id);
    GamesService.RespondWithCurrentGame(
      req.app.get('db'),
      req.params.game_id,
      req.params.second_player_id
    )
      .then(board => {
        res.json(board);
      })
      .catch(next);
  });

gamesRouter
  .route('/:game_id')
  .all(requireAuth)
  .all(checkGameExists)
  .patch(jsonBodyParser, (req, res, next) => {
    console.log(req.user); //first or second person ?
    //
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
