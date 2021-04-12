import {combineReducers, createStore} from "redux";
import profileReducer from "../reducers/profileReducer";
import dialogsReducer from "../reducers/dialogsReducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

let store = createStore(reducers);

export default store;