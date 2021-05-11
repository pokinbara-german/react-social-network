import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "../reducers/profileReducer";
import dialogsReducer from "../reducers/dialogsReducer";
import usersReducer from "../reducers/usersReducer";
import authReducer from "../reducers/authReducer";
import appReducer from "../reducers/appReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;