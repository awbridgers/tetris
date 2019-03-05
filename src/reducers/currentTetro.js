import tetroArray from '../shapes.js'

export const currentTetro = (state = tetroArray[6], action)=>{
  switch(action.type){
    case 'UPDATE_TETRO':
      return action.tetro;
    default:
      return state;
  }
}
