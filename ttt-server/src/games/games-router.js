const express = require('express');
const GamesService = require('./games-service');

const gamesRouter = express.Router();

gamesRouter.route('/').get((req, res, next) => {
  GamesService.CreateNewGame(req.app.get('db'), req.params.player_id)
    .then(res.json(games))
    //request a new row to be made in the SQL database for two players to join
    //respond with an ID for a lobby for the two players
    .catch(next);
});

gamesRouter
  .route('/:game_id/:player_id')
  .all(checkGameExists)
  .get((req, res, next) => {
    GamesService.RespondWithCurrentGame(
      req.app.get('db'),
      req.params.game_id,
      req.params.player_id
    )
      .then(board => {
        //the client should be requesting this route after a player has made a move to update their board
        res.json(board); //the specific service may change as the game state could be running or it could be a game that as ended
      })
      .catch(next);
  });

gamesRouter
  .route('/:game_id/:player_id/:index')
  .all(checkGameExists)
  .post((req, res, next) => {
    GamesService.UpdateCurrentGame(
      req.app.get('db'),
      req.params.game_id,
      req.params.player_id,
      req.params.index
    )
      .then(board => {
        //this route should be used when either player makes a new move on the board
        res.json(board);
      })
      .catch(next);
  });

/* async/await syntax for promises */
async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.RespondWithCurrentGame(
      req.app.get('db'), //this is ancillary middlewear, should never be utilized because the app should be seamless to the point that an incorrect
      req.params.game_id //roomId will never be generated
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