const initialState = []

export default(state = initialState, action) =>{
  if(action.type == 'GET_ALL_MEETUPS'){
    return [...action.payload]
  } else if(action.type == 'DELETE_MEETINGS_WHEN_LOGOUT'){
    return []
  }
  return state;
}
