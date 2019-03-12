import React, {Component} from 'react';

const GameStart = (props) => (
  <div className = 'gameStart'>
    <button onClick = {props.startGame}>{`${props.gameOn ? 'Pause': 'Start'}`}</button>
  </div>
)


export default GameStart
