import React from 'react';


const Score = (props) =>(
  <div className = 'points'>
    <h1><u>Score</u></h1>
    <h2>{props.score}</h2>
  </div>
)

export default Score
