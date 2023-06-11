import { combineReducers } from "redux";
import { userLoginReducer , userRegisterReducer } from "./userReducers";

export default combineReducers({
    userLogin : userLoginReducer ,
    userRegister : userRegisterReducer
});