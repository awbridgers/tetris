import { combineReducers } from 'redux';
import { board } from './board.js';
import { currentTetro } from './currentTetro.js'
import { score } from './score.js'
import { gameOn } from './gameStatus.js'
import {gameStarted} from './gameStarted.js'

const rootReducer = combineReducers({
  board,
  currentTetro,
  score,
  gameOn,
  gameStarted
});

export default rootReducer
