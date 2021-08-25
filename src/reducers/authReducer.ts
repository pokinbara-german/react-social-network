import {Api} from '../components/API/api';
import {FormAction, stopSubmit} from 'redux-form';
import {baseThunkType, captchaResultCodeType, stringOrNull} from '../types';
import {inferActionsType} from '../redux/reduxStore';
import {Action} from 'redux';

export type initialStateType = {
    id: number | null,
    email: stringOrNull,
    login: stringOrNull,
    isAuth: boolean,
    isFetching: boolean,
    captchaUrl: stringOrNull
}

type actionsType = inferActionsType<typeof authActions>;
type thunkType = baseThunkType<actionsType | Action<actionsType> | Action<ReturnType<typeof stopSubmit>>, Promise<void | FormAction>>;

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: actionsType): initialStateType => {
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

/**
 * Gets auth data from backend and set it to state if successful.
 */
export const getAuth = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Me();

    if (data === null) {
        return;
    }

    let {id, email, login} = data;
    dispatch(authActions.setAuth(id, email, login, true));
}

/**
 * Sets user logged-in on backend, if needed captcha then requests it.
 * If successful sets auth data to state.
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {boolean} rememberMe - is need long session
 * @param {string} captcha - captcha text from user
 * @param errorCallback - callback calls on error from backend
 */
export const login = (email: string, password: string, rememberMe: boolean, captcha: string, errorCallback = (data: string) => {}): thunkType => async (dispatch) => {
    let data = await Api.Auth.Login(email, password, rememberMe, captcha);

    if (data.error) {
        if (data.resultCode === captchaResultCodeType.captchaRequired) {
            await dispatch(getCaptcha());
        }

        return errorCallback(data.error);
    }

    await dispatch(getAuth());
    dispatch(authActions.getCaptchaSuccess(null));
}

/**
 * Sets user as logged-out on backend, if successful clears auth data in state.
 */
export const logout = (): thunkType => async (dispatch) => {
    let data = await Api.Auth.Logout();

    if (!data) {
        return;
    }

    dispatch(authActions.setAuth(null, null, null, false));
}

/**
 * Gets url with captcha image from backend and sets it to state if successful.
 */
export const getCaptcha = (): thunkType => async (dispatch) => {
    let url = await Api.Security.getCaptcha();

    if (!url) {
        return;
    }

    dispatch(authActions.getCaptchaSuccess(url));
}

export default authReducer;