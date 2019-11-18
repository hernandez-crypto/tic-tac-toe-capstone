const express = require('express');
const GamesService = require('./games-service');

const gamesRouter = express.Router();

gamesRouter.route('/').get((req, res, next) => {
  GamesService.getAllGames(req.app.get('db'))
    .then(games => {
      res.json(games.map(GamesService.serializeGame));
    })
    .catch(next);
});

gamesRouter
  .route('/:game_id')
  .all(checkGameExists)
  .get((req, res) => {
    res.json(GamesService.serializeGame(res.game));
  });

gamesRouter
  .route('/:game_id/comments/')
  .all(checkGameExists)
  .get((req, res, next) => {
    GamesService.getCommentsForGame(
      req.app.get('db'),
      req.params.game_id
    )
      .then(comments => {
        res.json(comments.map(GamesService.serializeGameComment));
      })
      .catch(next);
  });

/* async/await syntax for promises */
async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.getById(
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
