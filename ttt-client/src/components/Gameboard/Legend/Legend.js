import React from 'react';
import './Legend.css';

export default function Legend(props) {
  return (
    <>
      <h2 className='legend One'>P{props.Players.currentPlayer}</h2>
      <div className='stats'>
        <h2 className='legend Two'>P1 : {props.Players.pOneScore}</h2>
        <h2 className='legend Three'>P2 : {props.Players.pTwoScore}</h2>
      </div>
    </>
  );
}
