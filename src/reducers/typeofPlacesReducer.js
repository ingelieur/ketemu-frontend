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
  name:'Coffee Shop',
},
{
  id:5,
  type:'restaurant',
  name:'Restaurant',
},
{
  id:6,
  type:'park',
  name:'Park',
},]

export default(state = initialState, action) =>{
  return state;
}
