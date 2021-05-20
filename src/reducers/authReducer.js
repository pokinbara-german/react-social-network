import {Api} from "../components/API/api";
import {stopSubmit} from "redux-form";

const SET_AUTH = 'SET-AUTH';
const GET_CAPTCHA_SUCCESS = 'GET-CAPTCHA-SUCCESS';

const initialStage = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
};

const authReducer = (state = initialStage, action) => {
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

export const setAuth = (id, email, login, isAuth) => ({type: SET_AUTH, data: {id, email, login, isAuth}});
export const getCaptchaSuccess = (url) => ({type: GET_CAPTCHA_SUCCESS, url});

export const getAuth = () => async (dispatch) => {
    let data = await Api.Auth.Me();

    if (data === null) {
        return;
    }

    let {id, email, login} = data;
    dispatch(setAuth(id, email, login, true));
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await Api.Auth.Login(email, password, rememberMe, captcha);

    if (data.error) {
        if (data.resultCode === 10) {
            dispatch(getCaptcha());
        }
        return dispatch(stopSubmit('login', {_error: data.error}));
    }

    dispatch(getAuth());
    dispatch(getCaptchaSuccess(null));
}

export const logout = () => async (dispatch) => {
    let data = await Api.Auth.Logout();

    if (!data) {
        return;
    }

    dispatch(setAuth(null, null, null, false));
}

export const getCaptcha = () => async (dispatch) => {
    let data = await Api.Security.getCaptcha();

    if (!data.url) {
        return;
    }

    dispatch(getCaptchaSuccess(data.url));
}

export default authReducer;