export const score = (state = 0, action) => {
  switch(action.type){
    case 'UPDATE_SCORE':
      return action.payload;
    case 'RESET_GAME':
      return 0;
    default:
      return state;
  }
}
