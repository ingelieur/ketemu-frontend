const initialState = {
  title:'',
  description:'',
  dateMeetUp:'',
  placeType:'',
  participants:[],
  dateDeadlineMeetUp:'',
}

export default(state = initialState, action) =>{

  if(action.type == 'INPUT_TITLE_MEETUP'){
    return { ...state, title:action.payload }
  }
  else if(action.type == 'INPUT_DESCRIPTION_MEETUP'){
    return { ...state, description:action.payload }
  }
  else if(action.type == 'INPUT_DATE_MEETUP'){
    return { ...state, dateMeetUp:action.payload}
  }
  else if(action.type == 'CHANGE_PLACE'){
    return { ...state, placeType:action.payload}
  }
  else if(action.type == 'INPUT_PARTICIPANTS_MEETUP'){
    return { ...state, participants:action.payload}
  }
  else if(action.type == 'INPUT_DATE_DEADLINE_MEETUP'){
    return { ...state, dateDeadlineMeetUp:action.payload}
  }
  else if(action.type == 'INPUT_SUKSES'){
    return{ ...initialState }
  }
  return state;
}
