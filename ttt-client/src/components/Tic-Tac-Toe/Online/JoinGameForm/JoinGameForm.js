import React, { Component } from 'react';
import BoardApiService from '../../../../services/board-api-service';
import { Button, Input, Required } from '../../../Utils/Utils';

export default class JoinGameForm extends Component {
  static defaultProps = {
    onJoinSuccess: () => {},
  };

  state = {
    error: null,
    gameRoom: '',
  };

  handleJoinSubmit = ev => {
    ev.preventDefault();
    const { game_room } = ev.target;
    console.log(game_room.value);
    this.setState({ error: null });
    BoardApiService.getCurrentBoard(game_room.value)
      .then(game => {
        this.props.onJoinSuccess(game_room.value);
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };
  createNewGame = () => {
    let roomName = Math.random()
      .toString(36)
      .substring(2, 15);
    BoardApiService.createNewBoard(roomName).then(res => {
      this.setState({ gameRoom: res.board.game_room });
    });
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <Button onClick={() => this.createNewGame()}>Create</Button>
        <form className="JoinGameForm" onSubmit={this.handleJoinSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="game_room">
            <label htmlFor="JoinGameForm__game_room">
              Insert Game Room <Required />
            </label>
            <Input
              name="game_room"
              type="text"
              required
              id="JoinGameForm__game_room"
            ></Input>
          </div>
          <Button type="submit">Join</Button>
        </form>
        <p>
          Game Room:{' '}
          {this.state.gameRoom === '' ? 'Press Create!' : this.state.gameRoom}
        </p>
      </>
    );
  }
}
