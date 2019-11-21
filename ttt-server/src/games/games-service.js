/* eslint-disable no-console */
/* eslint-disable quotes */
const GamesService = {
  getUserWithUserName(db, user_name) {
    return db('users')
      .where({ user_name })
      .first();
  },
  CreateNewGame(knex, playerId) {
    return knex //makes a new instance on the db that allows the sender to create an entry
      .insert({ player_started_id: playerId })
      .into('board');
  },
  UpdateCurrentGame(knex, game_id, index, playerId) {
    return knex('board') //update the game that the player is currently in
      .where({ game_id })
      .update({ [index]: playerId }) //POST
      .then(data => {
        console.log(data);
      });
    //there needs to be a check that ensures that the index hasn't been filled
  },
  RespondWithCurrentGame(knex, game_id) {
    return knex //respond with the opponents move to reload the opposing players board               //GET
      .select('*')
      .from('board')
      .where({ game_id })
      .first();
  },
};

module.exports = GamesService;
