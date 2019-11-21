import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import TicTacToe from '../../components/Tic-Tac-Toe/Tic-Tac-Toe';

export default class TTTMainPage extends Component {
  render() {
    return (
      <Section className="TTTMainPage">
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
        <TicTacToe />
      </Section>
    );
  }
}
