import axios from 'axios' ;
import {
    IDEAS_LIST_REQUEST ,
    IDEAS_LIST_SUCCESS , 
    IDEAS_LIST_FAIL , 
    IDEAS_CREATE_SUCCESS , 
    IDEAS_CREATE_REQUEST , 
    IDEAS_CREATE_FAIL ,
    IDEAS_UPDATE_FAIL ,
    IDEAS_UPDATE_SUCCESS ,
    IDEAS_UPDATE_REQUEST,
    IDEAS_DELETE_FAIL,
    IDEAS_DELETE_REQUEST,
    IDEAS_DELETE_SUCCESS
} from '../constants/ideaConstants.js'

export const listIdeas =()=>async(dispatch,getState)=>{
       try{
        dispatch({type : IDEAS_LIST_REQUEST}) ;
        const {userLogin : {userInfo}} = getState();
       
        const config = {
            headers : {
                'Authorization' : `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get('/api/ideas',config);
        
        dispatch({type : IDEAS_LIST_SUCCESS , payload : data});

       }catch(err){
          const message = err.response && err.response.data.message ?  err.response.data.message : err.message ;
          dispatch({type : IDEAS_LIST_FAIL , payload : message});
       }
}

export const createIdea =(title,content,category)=> async(dispatch,getState)=>{
       try{
          dispatch({type : IDEAS_CREATE_REQUEST}) ;
          const {userLogin : {userInfo}} = getState() ;
          const config = {
                headers : {
                   'Content-Type' : 'application/json', 
                    Authorization : `Bearer ${userInfo.token}`
                }
          }
          const {data} = await axios.post('/api/ideas/create',{title,content,category},config);
          dispatch({type : IDEAS_CREATE_SUCCESS , payload : data});
       }catch(err){
           const message = err.response && err.response.data.message ?  err.response.data.message : err.message ;
           dispatch({type :IDEAS_CREATE_FAIL , payload : message});
       }
}

export const updateIdea =(id,title,content,category)=>async(dispatch,getState)=>{
    try{
        dispatch({type : IDEAS_UPDATE_REQUEST}) ;
        const {userLogin : {userInfo}} = getState() ;
        const config = {
              headers : {
                 'Content-Type' : 'application/json', 
                  Authorization : `Bearer ${userInfo.token}`
              }
        }
        const {data} = await axios.put(`/api/ideas/${id}`,{title,content,category},config);
        dispatch({type : IDEAS_UPDATE_SUCCESS, payload : data});
     }catch(err){
         const message = err.response && err.response.data.message ?  err.response.data.message : err.message ;
         dispatch({type : IDEAS_UPDATE_FAIL , payload : message});
     }
}

export const deleteIdea =(id)=> async(dispatch,getState)=>{
       try{
        dispatch({type : IDEAS_DELETE_REQUEST}) ;
        const {userLogin : {userInfo}} = getState() ;
        const config = {
              headers : {
                 'Content-Type' : 'application/json', 
                  Authorization : `Bearer ${userInfo.token}`
              }
        }
        const {data} = await axios.delete(`/api/ideas/${id}`,config);
        dispatch({type : IDEAS_DELETE_SUCCESS, payload : data});
       }catch(err){
          const message = err.response && err.response.data.message ?  err.response.data.message : err.message ;
          dispatch({type : IDEAS_DELETE_FAIL , payload : message});
       }
}