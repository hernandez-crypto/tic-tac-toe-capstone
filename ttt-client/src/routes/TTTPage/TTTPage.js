import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import TicTacToeOffline from '../../components/Tic-Tac-Toe/Offline/Tic-Tac-Toe';
import TicTacToeOnline from '../../components/Tic-Tac-Toe/Online/Tic-Tac-Toe';

export default class TTTPage extends Component {
  state = {
    online: false,
  };
  changePlayerMode = () => {
    this.state.online === false
      ? this.setState({ online: true })
      : this.setState({ online: false });
  };
  render() {
    return (
      <Section className="TTTPage">
        {/* <button onClick={this.changePlayerMode()}>
          <h2>Play Online 1v1 ?</h2>
        </button> */}
        {/* {this.state.online === false ? (
          <TicTacToeOffline />
        ) : (
          <TicTacToeOnline />
        )} */}
        <TicTacToeOffline />
      </Section>
    );
  }
}
