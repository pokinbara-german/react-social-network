import {Api} from "../components/API/api";

const SET_AUTH = 'SET-AUTH';

const initialStage = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialStage, action) => {
    switch (action.type) {

        case SET_AUTH:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuth = (id, email, login) => ({type: SET_AUTH, data: {id, email, login}});

export const getAuth = () => (dispatch) => {
    Api.Auth.Me().then(data => {
        if (data === null) {
            return;
        }

        let {id, email, login} = data;
        dispatch(setAuth(id, email, login));
    });
}

export default authReducer;