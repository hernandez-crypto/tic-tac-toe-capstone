/* eslint-disable quotes */
const xss = require('xss');

const GamesService = {
  CreateNewGame(id) {
    //makes a new instance on the db that allows the sender to create an entry
  },
  UpdateCurrentGame(roomId, updatedBoard) {
    //update the game that the player is currently in
  },
};

module.exports = GamesService;
