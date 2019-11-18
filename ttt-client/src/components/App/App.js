import React, { Component } from 'react';
import './App.css';
import Board from '../Gameboard/Board/Board';
import Legend from '../Gameboard/Legend/Legend';

export default class App extends Component {
  state = {
    playerOne: {
      moves: [],
      computer: false,
      score: 0,
    },
    playerTwo: {
      moves: [],
      computer: false,
      score: 0,
    },
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 1,
    count: 0,
  };

  restartGame = winner => {
    this.setState({
      playerOne: {
        moves: [],
        computer: this.state.playerOne.computer,
        score: this.state.playerOne.score,
      },
      playerTwo: {
        moves: [],
        computer: this.state.playerTwo.computer,
        score: this.state.playerTwo.score,
      },
      board: ['', '', '', '', '', '', '', '', ''],
      count: 0,
    });
    if (winner === 1) {
      this.setState({
        playerOne: {
          moves: [],
          computer: this.state.playerOne.computer,
          score: this.state.playerOne.score + 1,
        },
      });
    }
    if (winner === 2) {
      this.setState({
        playerTwo: {
          moves: [],
          computer: this.state.playerTwo.computer,
          score: this.state.playerTwo.score + 1,
        },
      });
    }
  };

  determineWinner = (currentPlayer, squareNumber) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winCombos.forEach(item => {
      let [a, b, c] = item;
      let { playerOne, playerTwo } = this.state;
      let one = [...playerOne.moves, parseInt(squareNumber)];
      let two = [...playerTwo.moves, parseInt(squareNumber)];
      if (currentPlayer === 1) {
        if (one.includes(a) && one.includes(b) && one.includes(c)) {
          return this.restartGame(currentPlayer);
        }
      } else if (currentPlayer === 2) {
        if (two.includes(a) && two.includes(b) && two.includes(c)) {
          return this.restartGame(currentPlayer);
        }
      }
      if (this.state.count === 9) {
        this.restartGame();
      }
    });
  };

  setChoice = squareNumber => {
    let { playerOne, playerTwo, currentPlayer } = this.state;
    let board = [...this.state.board];
    board[squareNumber] = currentPlayer;
    if (currentPlayer === 1) {
      this.setState({
        board,
        playerOne: {
          moves: [...playerOne.moves, parseInt(squareNumber)],
          computer: this.state.playerOne.computer,
          score: this.state.playerOne.score,
        },
        currentPlayer: 2,
        count: this.state.count + 1,
      });
    }
    if (currentPlayer === 2) {
      this.setState({
        board,
        playerTwo: {
          moves: [...playerTwo.moves, parseInt(squareNumber)],
          computer: this.state.playerTwo.computer,
          score: this.state.playerTwo.score,
        },
        currentPlayer: 1,
        count: this.state.count + 1,
      });
    }
    this.determineWinner(currentPlayer, squareNumber);
  };

  render() {
    return (
      <>
        <h1>Tic Tac Toe</h1>
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
      </>
    );
  }
}
