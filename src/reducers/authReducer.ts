import {Api} from "../components/API/api";
import {stopSubmit} from "redux-form";
import {stringOrNull} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType, inferActionsType} from "../redux/reduxStore";

export type initialStageType = {
    id: number | null,
    email: stringOrNull,
    login: stringOrNull,
    isAuth: boolean,
    isFetching: boolean,
    captchaUrl: stringOrNull
}

type thunkType = ThunkAction<Promise<void>, appStateType, any, actionsType>;
type actionsType = inferActionsType<typeof authActions>;

const initialStage: initialStageType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
};

const authReducer = (state = initialStage, action: actionsType): initialStageType => {
    switch (action.type) {

        case 'SET_AUTH':
            return {
                ...state,
                ...action.data
            }
        case 'GET_CAPTCHA_SUCCESS':
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state;
    }
}

export const authActions = {
    setAuth: (id: number | null, email: stringOrNull, login: stringOrNull, isAuth:boolean) => ({
        type: 'SET_AUTH',
        data: {id, email, login, isAuth}} as const),
    getCaptchaSuccess: (url: stringOrNull) => ({type: 'GET_CAPTCHA_SUCCESS', url} as const)
}

export const getAuth = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Me();

    if (data === null) {
        return;
    }

    let {id, email, login} = data;
    dispatch(authActions.setAuth(id, email, login, true));
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data:any = await Api.Auth.Login(email, password, rememberMe, captcha);

    if (data.error) {
        if (data.resultCode === 10) {
            dispatch(getCaptcha());
        }
        return dispatch(stopSubmit('login', {_error: data.error}));
    }

    dispatch(getAuth());
    dispatch(authActions.getCaptchaSuccess(null));
}

export const logout = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Logout();

    if (!data) {
        return;
    }

    dispatch(authActions.setAuth(null, null, null, false));
}

export const getCaptcha = (): thunkType => async (dispatch) => {
    let url = await Api.Security.getCaptcha();

    if (!url) {
        return;
    }

    dispatch(authActions.getCaptchaSuccess(url));
}

export default authReducer;