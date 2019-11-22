import TicTacToeGame from '../../components/Tic-Tac-Toe/Online/InGame/Tic-Tac-Toe';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';

export default class TTTOnlineGame extends Component {
  render() {
    return (
      <div>
        <Section className="gameRoom">
          <TicTacToeGame />
        </Section>
      </div>
    );
  }
}
