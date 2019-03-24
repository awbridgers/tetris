import { combineReducers } from 'redux';
import { board } from './board.js';
import { currentTetro } from './currentTetro.js'
import { score } from './score.js'
import { gameOn } from './gameStatus.js'
import {gameStarted} from './gameStarted.js'
import { gameOver } from './gameOver.js';
import { date } from './date.js';

const rootReducer = combineReducers({
  board,
  currentTetro,
  score,
  gameOn,
  gameStarted,
  gameOver,
  date
});

export default rootReducer
