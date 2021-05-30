import {Api} from "../components/API/api";
import {stopSubmit} from "redux-form";

const SET_AUTH = 'SET-AUTH';
const GET_CAPTCHA_SUCCESS = 'GET-CAPTCHA-SUCCESS';

type stringOrNull = string | null;

export type initialStageType = {
    id: number | null,
    email: stringOrNull,
    login: stringOrNull,
    isAuth: boolean,
    isFetching: boolean,
    captchaUrl: stringOrNull
}

type setAuthActionDataType = {
    id: number | null,
    email: stringOrNull,
    login: stringOrNull,
    isAuth: boolean
}
type setAuthActionType = {
    type: typeof SET_AUTH,
    data: setAuthActionDataType
}

type getCaptchaSuccessActionType = {
    type: typeof GET_CAPTCHA_SUCCESS,
    url: stringOrNull
}

const initialStage: initialStageType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
};

const authReducer = (state = initialStage, action: any): initialStageType => {
    switch (action.type) {

        case SET_AUTH:
            return {
                ...state,
                ...action.data
            }
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                captchaUrl: action.url
            }
        default:
            return state;
    }
}

export const setAuth = (id: number | null, email: stringOrNull, login: stringOrNull, isAuth:boolean): setAuthActionType => ({type: SET_AUTH, data: {id, email, login, isAuth}});
export const getCaptchaSuccess = (url: stringOrNull): getCaptchaSuccessActionType => ({type: GET_CAPTCHA_SUCCESS, url});

export const getAuth = () => async (dispatch: any) => {
    let data = await Api.Auth.Me();

    if (data === null) {
        return;
    }

    let {id, email, login} = data;
    dispatch(setAuth(id, email, login, true));
}

export const login = (email: string, password: string, rememberMe: string, captcha: string) => async (dispatch: any) => {
    let data:any = await Api.Auth.Login(email, password, rememberMe, captcha);

    if (data.error) {
        if (data.resultCode === 10) {
            dispatch(getCaptcha());
        }
        return dispatch(stopSubmit('login', {_error: data.error}));
    }

    dispatch(getAuth());
    dispatch(getCaptchaSuccess(null));
}

export const logout = () => async (dispatch: any) => {
    let data = await Api.Auth.Logout();

    if (!data) {
        return;
    }

    dispatch(setAuth(null, null, null, false));
}

export const getCaptcha = () => async (dispatch: any) => {
    let data = await Api.Security.getCaptcha();

    if (!data.url) {
        return;
    }

    dispatch(getCaptchaSuccess(data.url));
}

export default authReducer;