import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConstants";
import axios from 'axios';
import {
  USER_REGISTER_FAIL ,
  USER_REGISTER_REQUEST ,
  USER_REGISTER_SUCCESS
} from '../constants/userConstants'

// returning function instead of object because of redux thunk middleware 
export const login = (email,password) => async(dispatch) =>{
      try{
       dispatch({type : USER_LOGIN_REQUEST});
       const config = {
          headers : {
            'Content-Type' : 'application/json'
          }
       }
      const {data} = await axios.post('/api/users/login' , {email,password} , config);
      dispatch({type : USER_LOGIN_SUCCESS , payload : data});
      localStorage.setItem('userInfo' , JSON.stringify(data));
      }catch(err){
        dispatch({
            type : USER_LOGIN_FAIL ,
            payload :
             err.response && err.response.data.message ? err.response.data.message : err.message
        })
      }
}


export const logout = () => async(dispatch) =>{
  localStorage.removeItem('userInfo');
  dispatch({type : USER_LOGOUT});  
}

export const register = (name,pic,email,password) => async(dispatch)=>{
    try{
      dispatch({type : USER_REGISTER_REQUEST});
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }
      const {data} = await axios.post('/api/users' , {name,pic,email,password} , config);
      dispatch({type : USER_REGISTER_SUCCESS , payload : data});
      dispatch({type : USER_LOGIN_SUCCESS , payload : data});
      localStorage.setItem('userInfo' , JSON.stringify(data));
    }catch(err){
      dispatch({
        type : USER_REGISTER_FAIL ,
        payload :
         err.response && err.response.data.message ? err.response.data.message : err.message
    })
    }
}