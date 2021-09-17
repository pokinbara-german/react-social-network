import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "../reducers/profileReducer";
import dialogsReducer from "../reducers/dialogsReducer";
import usersReducer from "../reducers/usersReducer";
import authReducer from "../reducers/authReducer";
import appReducer from "../reducers/appReducer";
import thunk from "redux-thunk";
import chatReducer from '../reducers/chatReducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>;
export type inferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;