const initialState = {
  title:'',
  description:'',
  date:'',
  placeType:'',
}

export default(state = initialState, action) =>{
  if(action.type == 'CHANGE_PLACE'){
    return { ...state, placeType:action.payload}
  }
  return state;
}
