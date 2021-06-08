import {Api} from '../components/API/api';
import {FormAction, stopSubmit} from 'redux-form';
import {baseThunkType, stringOrNull} from './types/types';
import {inferActionsType} from '../redux/reduxStore';
import {Action} from 'redux';

export type initialStageType = {
    id: number | null,
    email: stringOrNull,
    login: stringOrNull,
    isAuth: boolean,
    isFetching: boolean,
    captchaUrl: stringOrNull
}

type actionsType = inferActionsType<typeof authActions>;
type thunkType = baseThunkType<actionsType | Action<actionsType> | Action<ReturnType<typeof stopSubmit>>, Promise<void | FormAction>>;

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

        case 'SN/AUTH/SET_AUTH':
            return {
                ...state,
                ...action.data
            }
        case 'SN/AUTH/GET_CAPTCHA_SUCCESS':
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
        type: 'SN/AUTH/SET_AUTH',
        data: {id, email, login, isAuth}} as const),
    getCaptchaSuccess: (url: stringOrNull) => ({type: 'SN/AUTH/GET_CAPTCHA_SUCCESS', url} as const)
}

export const getAuth = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Me();

    if (data === null) {
        return;
    }

    let {id, email, login} = data;
    dispatch(authActions.setAuth(id, email, login, true));
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): thunkType => async (dispatch) => {
    let data:any = await Api.Auth.Login(email, password, rememberMe, captcha);

    if (data.error) {
        if (data.resultCode === 10) {
            await dispatch(getCaptcha());
        }

        return dispatch(stopSubmit('login', {_error: data.error}));
    }

    await dispatch(getAuth());
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