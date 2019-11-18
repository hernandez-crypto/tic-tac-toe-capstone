import React, { Component } from 'react';
import './App.css';
import Board from '../Gameboard/Board/Board';
import Legend from '../Gameboard/Legend/Legend';

export default class App extends Component {
  state = {
    playerOne: [],
    pOneScore: 0,
    playerTwo: [],
    pTwoScore: 0,
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 1,
    count: 0,
  };

  restartGame = (winner) => {
    this.setState({
      playerOne: [],
      playerTwo: [],
      board: ['', '', '', '', '', '', '', '', ''],
      count: 0,
    });
    if (winner === 1) {
      this.setState({
        pOneScore: this.state.pOneScore + 1,
      });
    }
    if (winner === 2) {
      this.setState({
        pTwoScore: this.state.pTwoScore + 1,
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
    winCombos.forEach((item) => {
      let [a, b, c] = item;
      let { playerOne, playerTwo } = this.state;
      if (currentPlayer === 1) {
        let one = [...playerOne, parseInt(squareNumber)];
        if (one.includes(a) && one.includes(b) && one.includes(c)) {
          return this.restartGame(currentPlayer);
        }
      } else if (currentPlayer === 2) {
        let two = [...playerTwo, parseInt(squareNumber)];
        if (two.includes(a) && two.includes(b) && two.includes(c)) {
          return this.restartGame(currentPlayer);
        }
      }
      if (this.state.count === 9) {
        this.restartGame();
      }
    });
  };

  setChoice = (squareNumber) => {
    let { playerOne, playerTwo, currentPlayer } = this.state;
    let board = [...this.state.board]; 
    board[squareNumber] = currentPlayer;
    if (currentPlayer === 1) {
      this.setState({
        board,
        playerOne: [...playerOne, parseInt(squareNumber)],
        currentPlayer: 2,
        count: this.state.count + 1,
      });
    }
    if (currentPlayer === 2) {
      this.setState({
        board,
        playerTwo: [...playerTwo, parseInt(squareNumber)],
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
        <Legend Players={this.state} />
      </>
    );
  }
}
