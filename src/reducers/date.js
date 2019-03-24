export const date = (state = new Date(), action) =>{
  switch(action.type){
    case 'UPDATE_DATE' :
      return action.payload;
    default: return state
  }
}
