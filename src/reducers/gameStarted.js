export const gameStarted = (state = false, action) =>{
  switch(action.type){
    case 'START_GAME':
      return action.payload;
    case 'RESET_GAME':
      return true;
    default:
      return state;
  }
}
