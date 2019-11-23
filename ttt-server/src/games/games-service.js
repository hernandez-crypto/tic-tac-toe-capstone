/* eslint-disable no-console */
/* eslint-disable quotes */
const GamesService = {
  CreateNewGame(knex, player_started_id, game_room) {
    return knex
      .insert({ player_started_id, game_room })
      .into('board')
      .returning('*')
      .then(([game]) => game)
      .then(game => this.RespondWithCurrentGame(knex, game.game_room));
  },
  UpdateCurrentGame(knex, game_room, board) {
    return knex('board')
      .update({ board })
      .where({ game_room })
      .returning('*')
      .then(([game]) => game)
      .then(game => this.RespondWithCurrentGame(knex, game.game_room));
  },
  RespondWithCurrentGame(knex, game_room) {
    return knex
      .select('*')
      .from('board')
      .where({ game_room })
      .first();
  },
};

module.exports = GamesService;
