import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import counterReducer from '../features/counter/counterSlice';
import rulesReducer from '../features/rulesSlice';


const reducer = {
   // counter: counterReducer,
    rulesList: rulesReducer
}
const middleware = [...getDefaultMiddleware(),thunk, logger]
export default configureStore({
   reducer,
   middleware
})
