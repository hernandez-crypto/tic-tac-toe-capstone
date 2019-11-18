import React, { Component } from 'react';

export class TypeSelector extends Component {
  render() {
    return (
      <div>
        <select>
          <option>Choose Game Type</option>
          <option>Single Player</option>
          <option>Multiplayer</option>
        </select>
        {/* theres going to be a button that asks for the game type. When the player chooses 
      to play a local game against a bot. Another list of options will be presented for the user
      to choose a difficulty. If the user goes the human route, then the user will be presented with
      the option to play on one device device. If they choose to play on the same devicde that will be 
      handled accordingly. And if they choose to play with two players then the server will generate
      */}
      </div>
    );
  }
}

export default TypeSelector;
