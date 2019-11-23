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
    board: {
      square_one: 0,
      square_two: 0,
      square_three: 0,
      square_four: 0,
      square_five: 0,
      square_six: 0,
      square_seven: 0,
      square_eight: 0,
      square_nine: 0,
    },
    currentPlayer: 1,
    count: 0,
  };

  loadSquares = board => {
    this.setState({ board });
  };

  setChoice = squareNumber => {
    const gameRoom = this.props.roomName;
    let updatedBoard = { ...this.state.board };
    switch (parseInt(squareNumber)) {
      case 0:
        updatedBoard = { ...updatedBoard, square_one: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard).then(
          board => {
            // this.setState({ board });
            console.log(board, 'board updated');
          }
        );
      case 1:
        updatedBoard = { ...updatedBoard, square_two: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 2:
        updatedBoard = { ...updatedBoard, square_three: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 3:
        updatedBoard = { ...updatedBoard, square_four: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 4:
        updatedBoard = { ...updatedBoard, square_five: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 5:
        updatedBoard = { ...updatedBoard, square_six: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 6:
        updatedBoard = { ...updatedBoard, square_seven: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 7:
        updatedBoard = { ...updatedBoard, square_eight: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      case 8:
        updatedBoard = { ...updatedBoard, square_nine: 1 };
        return BoardApiService.patchNewMove(gameRoom, updatedBoard);
      default:
        return console.log('Hello World');
    }
  };

  render() {
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
        />
      </div>
    );
  }
}
