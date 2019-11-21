import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import TicTacToe from '../../components/Tic-Tac-Toe/Tic-Tac-Toe';

export default class TTTMainPage extends Component {
  render() {
    return (
      <Section className="TTTMainPage">
        {/* <h2>Tic-Tac-Toe</h2>
        <p>Featuring Unbeatable AI</p> */}
        <TicTacToe />
      </Section>
    );
  }
}
