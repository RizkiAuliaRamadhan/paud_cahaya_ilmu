import { combineReducers } from 'redux';
import UserReducer from './user';
import AuthReducer from './auth';
import DataReducer from './data';

const rootReducer = combineReducers({ UserReducer, AuthReducer, DataReducer });

export default rootReducer;
