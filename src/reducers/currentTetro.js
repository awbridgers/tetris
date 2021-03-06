import tetroArray from '../shapes.js'

export const currentTetro = (state = [], action)=>{
  switch(action.type){
    case 'UPDATE_BOARD':
      if(action.spawn){
        return tetroArray[Math.floor(Math.random()*tetroArray.length)];
      }
      else{
        return state;
      }
    case 'UPDATE_TETRO':
      return action.tetro;
    case 'SPAWN_TETRO':
      return tetroArray[Math.floor(Math.random()*tetroArray.length)];
    case 'RESET_GAME':
      return tetroArray[Math.floor(Math.random()*tetroArray.length)];
    default:
      return state;
  }
}
