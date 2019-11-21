import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import TicTacToeOffline from '../../components/Tic-Tac-Toe/Offline/Tic-Tac-Toe';
import { Link } from 'react-router-dom';

export default class TTTOffline extends Component {
  render() {
    return (
      <Section className="TTTOffline">
        <p>Unbeatable AI coming soon</p>
        <TicTacToeOffline />
        <Link to="/tic-tac-toe/online">
          <h3>Play Online</h3>
        </Link>
      </Section>
    );
  }
}
