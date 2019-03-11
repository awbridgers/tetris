import { combineReducers } from 'redux';
import { board } from './board.js';
import { currentTetro } from './currentTetro.js'
import { score } from './score.js'

const rootReducer = combineReducers({
  board,
  currentTetro,
  score
});

export default rootReducer
