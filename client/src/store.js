import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk),
  })
  
export default store ;
