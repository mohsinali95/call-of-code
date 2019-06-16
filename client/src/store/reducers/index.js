import reducer from './reducer';
import profileReducer from './profileReducer';
import friendReducer from './friendReducer';
import competitionReducer from './competitionReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    root: reducer,
    profileReducerRoot:profileReducer,
    friendReducerRoot:friendReducer,
    competitionReducer:competitionReducer
});