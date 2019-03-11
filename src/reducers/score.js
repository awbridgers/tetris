export const score = (state = 0, action) => {
  switch(action.type){
    case 'UPDATE_SCORE':
      return action.payload;
    default:
      return state;
  }
}
