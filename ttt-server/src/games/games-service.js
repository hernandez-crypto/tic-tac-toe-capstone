/* eslint-disable no-console */
/* eslint-disable quotes */
const xss = require('xss');

const GamesService = {
  CreateNewGame(knex, playerId) {
    return knex
      .insert(playerId) //makes a new instance on the db that allows the sender to create an entry           //GET
      .into('game')
      .returning('what ever the roooms id is')
      .then(data => {
        console.log(data);
      });
  },
  UpdateCurrentGame(knex, gameId, playerId, index) {
    return knex('game') //update the game that the player is currently in                                    //POST
      .where({ gameId })
      .update(index); //  <-- this could potentially be wrong. We should be updating the board value, which also contains the sqaures(indexes)
  },
  RespondWithCurrentGame(knex, gameId, playerId) {
    return knex //respond with the opponents move to reload the opposing players board               //GET
      .where({ gameId })
      .first();
  },
  // RespondWithEndGameWinner(knex) {
  //   //the server responds that the current game is over and that a player has won or     //GET    <----- whole function acts almost like the
  //   //there has been a tie                                                                               RespondWithCurrentGame() function, may not
  // },                                                                                                     be required
};

module.exports = GamesService;
