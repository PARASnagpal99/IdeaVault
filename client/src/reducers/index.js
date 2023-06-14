import { combineReducers } from "redux";
import { userLoginReducer , userRegisterReducer } from "./userReducers";
import { ideaListReducer , ideaCreateReducer , ideaUpdateReducer , ideaDeleteReducer } from "./ideaReducers";

export default combineReducers({
    userLogin : userLoginReducer ,
    userRegister : userRegisterReducer ,
    ideaList : ideaListReducer,
    ideaCreate : ideaCreateReducer ,
    ideaUpdate : ideaUpdateReducer ,
    ideaDelete : ideaDeleteReducer ,
});