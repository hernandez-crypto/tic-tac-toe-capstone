import TicTacToeOnline from '../../components/Tic-Tac-Toe/Online/Tic-Tac-Toe';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';

export default class TTTOnline extends Component {
  render() {
    return (
      <div>
        <Section className="TTTPage">
          <p>Unbeatable AI coming soon</p>
          <TicTacToeOnline />
          <Link to="/tic-tac-toe">
            <h3>Play Offline</h3>
          </Link>
        </Section>
      </div>
    );
  }
}
