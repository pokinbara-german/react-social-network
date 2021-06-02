import {Api} from "../components/API/api";
import {stopSubmit} from "redux-form";
import {stringOrNull} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType} from "../redux/reduxStore";

const SET_AUTH = 'SET-AUTH';
const GET_CAPTCHA_SUCCESS = 'GET-CAPTCHA-SUCCESS';

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

type actionsType = setAuthActionType | getCaptchaSuccessActionType;

type thunkType = ThunkAction<Promise<void>, appStateType, any, actionsType>;

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

export const getAuth = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Me();

    if (data === null) {
        return;
    }

    let {id, email, login} = data;
    dispatch(setAuth(id, email, login, true));
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
    dispatch(getCaptchaSuccess(null));
}

export const logout = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Logout();

    if (!data) {
        return;
    }

    dispatch(setAuth(null, null, null, false));
}

export const getCaptcha = (): thunkType => async (dispatch) => {
    let url = await Api.Security.getCaptcha();

    if (!url) {
        return;
    }

    dispatch(getCaptchaSuccess(url));
}

export default authReducer;