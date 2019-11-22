/* eslint-disable no-console */
/* eslint-disable quotes */
const GamesService = {
  CreateNewGame(knex, player_started_id, game_room) {
    console.log(game_room);
    return knex //makes a new instance on the db that allows the sender to create an entry
      .insert({ player_started_id }) //gameId is going to be inserted into here now, work on implementing that
      .insert({ game_room })
      .into('board'); //should basically have all of these functions hooked up and the 1v1 Online mode should be enabled
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
