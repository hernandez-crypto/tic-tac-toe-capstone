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
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    currentPlayer: 1,
    count: 0,
    gameRoom: '',
  };

  componentDidMount() {
    this.setState({
      gameRoom: 
    })
  }

  loadSquares = () => {
    //load up the squares in state
  };

  setChoice = squareNumber => {
    console.log(squareNumber);
    switch (squareNumber) {
      case 0:
        console.log('square_one posted');
        return BoardApiService.postNewMove('square_one');
      case 1:
        return BoardApiService.postNewMove('square_two');
      case 2:
        return BoardApiService.postNewMove('square_three');
      case 3:
        return BoardApiService.postNewMove('square_four');
      case 4:
        return BoardApiService.postNewMove('square_five');
      case 5:
        return BoardApiService.postNewMove('square_six');
      case 6:
        return BoardApiService.postNewMove('square_seven');
      case 7:
        return BoardApiService.postNewMove('square_eight');
      case 8:
        return BoardApiService.postNewMove('square_nine');
      // default:
      //   return console.log('Hello World');
    }

    // this.determineWinner(currentPlayer, squareNumber);   <--- handle the structure of the response. make a function for it ?
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
