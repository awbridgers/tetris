export const gameOn = (state = false, action) => {
  switch(action.type){
    case 'SWITCH_GAME_ON':
      return action.payload;
    default:
      return state;
  }
}
