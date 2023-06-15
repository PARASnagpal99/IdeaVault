import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../constants/userConstants";
import axios from 'axios';
import {
  USER_REGISTER_FAIL ,
  USER_REGISTER_REQUEST ,
  USER_REGISTER_SUCCESS ,
  USER_UPDATE_REQUEST , 
  USER_UPDATE_SUCCESS ,
  USER_UPDATE_FAIL
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

export const register = (name,picture,email,password) => async(dispatch)=>{
    try{
      dispatch({type : USER_REGISTER_REQUEST});
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }
      const {data} = await axios.post('/api/users' , {name,picture,email,password} , config);
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

export const updateProfile =(name,picture,email,password)=>async(dispatch,getState)=>{
       try {
         dispatch({type : USER_UPDATE_REQUEST});
         
         const {userLogin : {userInfo}} = getState() ;        
         const config = {
            headers : {
              "Content-Type" : "application/json" ,
              Authorization : `Bearer ${userInfo.token}`
            }
         }
        //  console.log("Befor API request");
        //  console.log(picture);
         const {data} = await axios.post('/api/users/profile',{name,picture,email,password},config);
        //  console.log(data);
        //  console.log("checking")
         dispatch({type : USER_UPDATE_SUCCESS , payload : data});
         dispatch({type : USER_LOGIN_SUCCESS , payload : data});
         localStorage.setItem('userInfo',JSON.stringify(data));
       }catch(err){
        dispatch({
          type : USER_UPDATE_FAIL ,
          payload :
           err.response && err.response.data.message ? err.response.data.message : err.message
      })
       }
}