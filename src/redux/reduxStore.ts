import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "../reducers/profileReducer";
import dialogsReducer from "../reducers/dialogsReducer";
import usersReducer from "../reducers/usersReducer";
import authReducer from "../reducers/authReducer";
import appReducer from "../reducers/appReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

type rootReducerType = typeof rootReducer;
export type appStateType = ReturnType<rootReducerType>;

type propsTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type inferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<propsTypes<T>>;

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;