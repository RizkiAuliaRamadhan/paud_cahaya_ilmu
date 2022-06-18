import { combineReducers } from 'redux';
import UserReducer from './user';
import AuthReducer from './auth';
import DataReducer from './data';
import RekamanReducer from './rekaman';

const rootReducer = combineReducers({ UserReducer, AuthReducer, DataReducer, RekamanReducer });

export default rootReducer;
