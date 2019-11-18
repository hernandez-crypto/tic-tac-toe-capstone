import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {
  handleClick = () => {
    let { id, setChoice } = this.props;
    setChoice(id);
  };

  render() {
    const { id } = this.props;
    let value = '';
    if (this.props.currentValue === 1) {
      value = 'X';
    }
    if (this.props.currentValue === 2) {
      value = 'O';
    }
    return (
      <div id={`${id}`} className='box' onClick={this.handleClick}>
        <h3>{value}</h3>
      </div>
    );
  }
}
