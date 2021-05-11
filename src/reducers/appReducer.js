import {getAuth} from "./authReducer";

const SET_INIT_DONE = 'SET-INIT-DONE';

const initialStage = {
    initDone: false
};

const authReducer = (state = initialStage, action) => {
    switch (action.type) {

        case SET_INIT_DONE:
            return {
                ...state,
                initDone: true
            }
        default:
            return state;
    }
}

export const setInitDone = () => ({type: SET_INIT_DONE});

export const makeInit = () => (dispatch) => {
    let promise = dispatch(getAuth());

    Promise.all([promise]).then(() => {
        dispatch(setInitDone());
    })
}

export default authReducer;