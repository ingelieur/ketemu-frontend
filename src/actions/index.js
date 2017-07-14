export const changeFalseModalPlaces = () =>{
  return {
    type:'FALSE_MODAL_PLACE',
  }
}

export const changeTrueModalPlaces = () =>{
  return {
    type:'TRUE_MODAL_PLACE',
  }
}

export const chooseMeetPlace = (place) =>{
  return {
    type:'CHANGE_PLACE',
    payload:place,
  }
}
