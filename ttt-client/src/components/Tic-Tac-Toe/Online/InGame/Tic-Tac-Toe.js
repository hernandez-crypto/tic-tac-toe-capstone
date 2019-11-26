import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
//import { Button } from '../../../Utils/Utils';
import './Tic-Tac-Toe.css';
import BoardApiService from '../../../../services/board-api-service';
import TokenService from '../../../../services/token-service';

export default class TicTacToe extends Component {
  state = {
    playerOne: {
      id: '',
      moves: [],
      score: 0,
      name: '',
    },
    playerTwo: {
      id: '',
      moves: [],
      score: 0,
      name: '',
    },
    client_user_id: TokenService.getAuthName(),
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentPlayer: 1,
    count: 0,
  };

  async componentDidMount() {
    try {
      setInterval(async () => {
        BoardApiService.getCurrentBoard(this.props.roomName).then(res => {
          console.log(res);
          res.board !== null // temporary need to set up database to default the value of the board row to nine zeros
            ? this.setState({
                board: res.board.split('').map(item => {
                  return parseInt(item);
                }),
                playerOne: {
                  ...this.state.playerOne,
                  name: res.player_started_usrname,
                  id: res.player_started_id,
                },
                playerTwo: {
                  ...this.state.playerTwo,
                  name: res.player_joined_usrname,
                  id: res.player_joined_id,
                },
              })
            : console.log('Hello World');
        });
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  }

  setChoice = (squareNumber, playerNumber = 0) => {
    const gameRoom = this.props.roomName;
    let updatedBoard = [...this.state.board];
    updatedBoard[squareNumber] = playerNumber;
    BoardApiService.patchNewMove(gameRoom, updatedBoard).then(res => {
      console.log(res.board);
      this.setState({
        board: res.board.split('').map(parseInt),
        currentPlayer: res.current_player,
      });
    });
  };

  render() {
    console.log(this.state);
    console.log(TokenService.getAuthId());
    return (
      <div className="tic-tac-toe-board">
        <Board
          setChoice={this.setChoice}
          currentPlayer={this.state.currentPlayer}
          board={this.state.board}
        />
        <Legend
          currentPlayer={this.state.currentPlayer}
          playerOne={this.state.playerOne}
          playerTwo={this.state.playerTwo}
          roomName={this.props.roomName}
        />
      </div>
    );
  }
}
