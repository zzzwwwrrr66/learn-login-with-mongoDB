import axios from "axios";

export const LOGIN_USER = 'LOGIN_USER';
export const SIGN_UP = 'SIGN_UP';

export const loginUser = (dataSubmit) => {
  const response = axios({
    method:"POST",
    url: '/api/users/login',
    data:{
        "email": dataSubmit.email,
        "password": dataSubmit.password
    }
    }).then((res)=>{
      return res.data
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });

  return {
    type: LOGIN_USER,
    payload: response,
  }
}

export const signUpUser = ({name, email, password}) => {
  const response = axios({
    method:"POST",
    url: '/api/users/ragister',
    data:{
        "name": name,
        "email": email,
        "password": password
    }
    }).then((res)=>{
        console.log(res);
        return res.data
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });

  return {
    type: SIGN_UP,
    payload: response,
  }
}