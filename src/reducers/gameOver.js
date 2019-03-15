export const gameOver = (state = false, action) =>{
  switch(action.type){
    case 'SWITCH_GAME_OVER':
      return action.payload;
    case 'RESET_GAME':
      return false;
    default:
      return state;
  }
}
