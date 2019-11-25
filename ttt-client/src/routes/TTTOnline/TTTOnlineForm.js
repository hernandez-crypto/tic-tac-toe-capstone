import TicTacToeForm from '../../components/Tic-Tac-Toe/Online/JoinGameForm/JoinGameForm';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';

export default class TTTOnlineForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  onJoinSuccess = gameRoom => {
    console.log(this.props);
    const { history } = this.props;
    history.push(`/tic-tac-toe/online/${gameRoom}`);
  };
  render() {
    return (
      <div>
        <Section className="TTTPage">
          <Link to="/tic-tac-toe">
            <h3>Play Offline</h3>
          </Link>
          <p>Play with a friend!</p>
          <TicTacToeForm onJoinSuccess={this.onJoinSuccess} />
        </Section>
      </div>
    );
  }
}
