import React, { Component } from 'react';

export default class ComputerPlayer extends Component {
  easyMode = board => {
    board.forEach(square => {
      if ((square = '')) {
        return square; // computer bot that chooses from the available spots on the board randomly
      }
    });
  };
  mediumMode = () => {
    // computer bot that chooses from the available spots on the board randomly & with the hard algorithm
  };
  hardMode = () => {
    // computer bot that chooses from the available spots on the board and finds the best spot on the board to win
  };

  render() {
    return <div></div>;
  }
}
