import React, { Component } from 'react';
import Board from './Gameboard/Board/Board';
import Legend from './Gameboard/Legend/Legend';
import ComputerPlayer from './ComputerPlayer';
import './Tic-Tac-Toe.css';

export default class TicTacToe extends Component {
  state = {
    playerOne: {
      symbol: 'X',
      moves: [],
      computer: 0,
      score: 0,
    },
    playerTwo: {
      symbol: 'O',
      moves: [],
      computer: 0,
      score: 0,
    },
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    currentPlayer: 1,
    count: 0,
  };

  componentDidMount() {
    this.computer = new ComputerPlayer(this.setChoice);
  }

  handleEndGame = winner => {
    if (!winner) {
      this.setState({
        playerOne: {
          ...this.state.playerOne,
        },
        playerTwo: {
          ...this.state.playerTwo,
        },
        count: -1,
      });
    }
    if (winner === 1) {
      this.setState({
        playerOne: {
          ...this.state.playerOne,
          score: this.state.playerOne.score + 1,
        },
        playerTwo: {
          ...this.state.playerTwo,
        },
        count: -1,
      });
    }
    if (winner === 2) {
      this.setState({
        playerTwo: {
          ...this.state.playerTwo,
          score: this.state.playerTwo.score + 1,
        },
        playerOne: {
          ...this.state.playerOne,
        },
        count: -1,
      });
    }
  };

  restartGame = () => {
    this.setState({
      playerOne: {
        ...this.state.playerOne,
        moves: [],
      },
      playerTwo: {
        ...this.state.playerTwo,
        moves: [],
      },
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      count: 0,
    });
    let clearBoxes = Object.values(document.getElementsByClassName('box'));
    clearBoxes.forEach(box => {
      box.classList.remove('red');
      box.classList.remove('blue');
    });
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
          let threeRow = [
            document.getElementById(a),
            document.getElementById(b),
            document.getElementById(c),
          ];
          threeRow.forEach(box => box.classList.add('red'));
          return this.handleEndGame(currentPlayer);
        }
      } else if (currentPlayer === 2) {
        if (two.includes(a) && two.includes(b) && two.includes(c)) {
          let threeRow = [
            document.getElementById(a),
            document.getElementById(b),
            document.getElementById(c),
          ];
          threeRow.forEach(box => box.classList.add('blue'));
          return this.handleEndGame(currentPlayer);
        }
      }
      if (this.state.count === 9) {
        this.handleEndGame();
        //announce that there was a tie
      }
    });
  };

  setChoice = squareNumber => {
    let { playerOne, playerTwo, currentPlayer } = this.state;
    let board = [...this.state.board];
    if (this.state.count === -1) {
      this.restartGame();
    }
    if (
      board[squareNumber] === this.state.playerOne.symbol ||
      board[squareNumber] === this.state.playerTwo.symbol ||
      this.state.count < 0
    )
      // prevent square that has already been taken from being claimed
      return;
    board[squareNumber] =
      currentPlayer === 1 ? playerOne.symbol : playerTwo.symbol;
    if (currentPlayer === 1) {
      this.setState({
        board,
        playerOne: {
          ...this.state.playerOne,
          moves: [...playerOne.moves, parseInt(squareNumber)],
        },
        currentPlayer: 2,
        count: this.state.count + 1,
      });
    }
    if (currentPlayer === 2) {
      this.setState({
        board,
        playerTwo: {
          ...this.state.playerTwo,
          moves: [...playerTwo.moves, parseInt(squareNumber)],
        },
        currentPlayer: 1,
        count: this.state.count + 1,
      });
    }
    this.determineWinner(currentPlayer, squareNumber);
  };

  componentDidUpdate() {
    let player =
      this.state.currentPlayer === 1
        ? this.state.playerOne
        : this.state.playerTwo;
    if (player.computer > 0) {
      this.computer.makeMove(
        player.computer,
        this.state.board,
        this.state.currentPlayer === 1 ? true : false
      );
    }
  }

  render() {
    let player =
      this.state.currentPlayer === 1
        ? this.state.playerOne
        : this.state.playerTwo;
    return (
      <div className="tic-tac-toe-board">
        <Board
          setChoice={player.computer === 0 ? this.setChoice : () => {}}
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
