import { combineReducers } from 'redux';
import { board } from './board.js';
import { currentTetro } from './currentTetro.js'

const rootReducer = combineReducers({
  board,
  currentTetro
});

export default rootReducer
