const initialState = false

export default(state = initialState, action) =>{
  if(action.type == 'TRUE_MODAL_PLACE'){
    return true;
  }
  else if(action.type == 'FALSE_MODAL_PLACE'){
    return false
  }
  return state;
}
