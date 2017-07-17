const initialState = []

export default(state = initialState, action) =>{
  if(actions.type == 'GET_ALL_MEETUPS'){
    return [...action.payload]
  }
  return state;
}
