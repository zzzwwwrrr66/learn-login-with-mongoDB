import { combineReducers } from "redux";
// import user from './user_reducer'
import { LOGIN_USER, SIGN_UP } from '../_actions/'

const user = (prevState = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...prevState, ...action.payload}
    
    default:
      return prevState
  }
}
const signUp = (prevState = {}, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {...prevState, ...action.payload}
    
    default:
      return prevState
  }
}

const rootReducer = combineReducers({ // 여러가지 Reducer들을 합쳐주는거
  user,
  signUp
});

export default rootReducer;