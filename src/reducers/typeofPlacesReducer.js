const initialState = [{
  id:1,
  type:'coworking_space',
  name:'Coworking Space',
},
{
  id:2,
  type:'library',
  name:'Library',
},
{
  id:3,
  type:'bar',
  name:'Bar',
},
{
  id:4,
  type:'cafe',
  name:'Coffe Shop',
},
{
  id:5,
  type:'shopping_mall',
  name:'Shopping Mall',
},
{
  id:6,
  type:'restaurant',
  name:'Restaurant',
},
{
  id:7,
  type:'park',
  name:'Park',
},]

export default(state = initialState, action) =>{
  return state;
}
