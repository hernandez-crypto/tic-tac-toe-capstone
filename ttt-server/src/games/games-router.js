const express = require('express');
const GamesService = require('./games-service');
const { requireAuth } = require('../middleware/jwt-auth');
const gamesRouter = express.Router();
const jsonBodyParser = express.json();

gamesRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { game_room } = req.body;
    console.log(req);
    GamesService.CreateNewGame(req.app.get('db'), req.user.id, game_room)
      .then(board => {
        res
          .status(200)
          .json({ board })
          .end();
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
        let {
          square_one,
          square_two,
          square_three,
          square_four,
          square_five,
          square_six,
          square_seven,
          square_eight,
          square_nine,
        } = board;
        res.json({
          square_one,
          square_two,
          square_three,
          square_four,
          square_five,
          square_six,
          square_seven,
          square_eight,
          square_nine,
        });
      })
      .catch(next);
  });

gamesRouter
  .route('/:game_id')
  .all(requireAuth)
  .all(checkGameExists)
  .patch((req, res, next) => {
    for (const [key, value] of Object.entries(req.body.updatedBoard))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });
    board.lastPlayerMove = req.user.id;
    GamesService.UpdateCurrentGame(
      req.app.get('db'),
      req.params.game_id,
      req.body.updatedBoard
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
