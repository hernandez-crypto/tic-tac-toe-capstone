/* eslint-disable no-console */
/* eslint-disable quotes */
const xss = require('xss');

const GamesService = {
  CreateNewGame(knex, playerId) {
    return (
      knex //makes a new instance on the db that allows the sender to create an entry           //GET
        .insert({ player_started_id: playerId })
        .into('board')
        // .returning(gameId) // <-- this may be incorrect, needs to return the entire object to get the board updated
        .then(data => {
          //
          console.log(data);
        })
    );
  },
  UpdateCurrentGame(knex, game_id, index, playerId) {
    // console.log(index);
    // knex('books')
    // .where('published_date', '<', 2000)
    // .update({ status: 'archived', thisKeyIsSkipped: undefined })
    return knex('board') //update the game that the player is currently in
      .where({ game_id })
      .update({ [index]: playerId }) //POST
      .then(data => {
        console.log(data);
      });
    //there needs to be a check that ensures that the index hasn't been filled
    //  <-- this could potentially be wrong. We should be updating the board value, which also contains the sqaures(indexes)
  },
  RespondWithCurrentGame(knex, game_id) {
    return knex //respond with the opponents move to reload the opposing players board               //GET
      .select('*')
      .from('board')
      .where({ game_id })
      .first();
  },
  // RespondWithEndGameWinner(knex) {
  //   //the server responds that the current game is over and that a player has won or     //GET    <----- whole function acts almost like the
  //   //there has been a tie                                                                               RespondWithCurrentGame() function, may not
  // },                                                                                                     be required
};

module.exports = GamesService;
