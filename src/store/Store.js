import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import HomeReducer from '../reducer/HomeReducer';
const AppReducer= combineReducers({
    HomeReducer
});

const rooReducder=(state,action)=>{
    return AppReducer(state,action);
}
const store=createStore(rooReducder,compose(applyMiddleware(thunk)));

export default store;