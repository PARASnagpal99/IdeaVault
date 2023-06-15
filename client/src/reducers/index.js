import { combineReducers } from "redux";
import { userLoginReducer , userRegisterReducer , userUpdateReducer} from "./userReducers";
import { ideaListReducer , ideaCreateReducer , ideaUpdateReducer , ideaDeleteReducer } from "./ideaReducers";

export default combineReducers({
    userLogin : userLoginReducer ,
    userRegister : userRegisterReducer ,
    userUpdate : userUpdateReducer ,
    ideaList : ideaListReducer,
    ideaCreate : ideaCreateReducer ,
    ideaUpdate : ideaUpdateReducer ,
    ideaDelete : ideaDeleteReducer ,
});