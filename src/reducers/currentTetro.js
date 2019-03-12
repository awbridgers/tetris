import tetroArray from '../shapes.js'

export const currentTetro = (state = [], action)=>{
  switch(action.type){
    case 'UPDATE_TETRO':
      return action.tetro;
    case 'SPAWN_TETRO':
      return tetroArray[Math.floor(Math.random()*tetroArray.length)];
    default:
      return state;
  }
}
