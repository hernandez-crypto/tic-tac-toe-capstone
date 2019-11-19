/* eslint-disable quotes */
const xss = require('xss');

const GamesService = {
  CreateNewGame(knex) {
    //makes a new instance on the db that allows the sender to create an entry           //GET
  },
  UpdateCurrentGame(knex, gameId, updatedBoard) {
    //update the game that the player is currently in                                    //POST
  },
  RespondWithCurrentGame(knex, gameId) {
    //respond with the opponents move to reload the opposing players board               //GET
  },
  RespondWithEndGameWinner(knex) {
    //the server responds that the current game is over and that a player has won or     //GET
    //there has been a tie
  },
};

module.exports = GamesService;
