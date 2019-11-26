import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
import { Button } from '../../../Utils/Utils';
import './Tic-Tac-Toe.css';
import BoardApiService from '../../../../services/board-api-service';

export default class TicTacToe extends Component {
  state = {
    playerOne: {
      symbol: 'X',
      moves: [],
      score: 0,
      name: '',
    },
    playerTwo: {
      symbol: 'O',
      moves: [],
      score: 0,
      name: '',
    },
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentPlayer: 1,
    count: 0,
  };

  componentDidMount() {
    BoardApiService.getCurrentBoard(this.props.roomName).then(res => {
      res.board !== null
        ? this.setState({
            board: res.board.split('').map(item => {
              return parseInt(item);
            }),
          })
        : console.log('Hello World');
    });
  }

  setChoice = (squareNumber, playerNumber = 1) => {
    const gameRoom = this.props.roomName;
    let updatedBoard = [...this.state.board];
    updatedBoard[squareNumber] = playerNumber;
    BoardApiService.patchNewMove(gameRoom, updatedBoard).then(res => {
      this.setState({
        board: res.board,
      });
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="tic-tac-toe-board">
        <Board
          setChoice={this.setChoice}
          currentPlayer={this.state.currentPlayer}
          board={this.state.board}
        />
        <Legend
          currentPlayer={this.state.currentPlayer}
          playerOne={this.state.playerOne.score}
          playerTwo={this.state.playerTwo.score}
          roomName={this.props.roomName}
        />
      </div>
    );
  }
}
