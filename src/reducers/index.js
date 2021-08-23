import {combineReducers} from 'redux';
import { userReducer } from './userReducer';
import {canReducer} from './canReducer';

export const rootReducer = combineReducers({
    canReducer, userReducer
})