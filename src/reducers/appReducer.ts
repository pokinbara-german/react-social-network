import {getAuth} from "./authReducer";

const SET_INIT_DONE = 'SET-INIT-DONE';

export type initialStageType = {
    initDone: boolean
}

type setInitDoneActionType = {
    type: typeof SET_INIT_DONE
}

const initialStage: initialStageType = {
    initDone: false
};

const authReducer = (state = initialStage, action: any): initialStageType => {
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

export const setInitDone = (): setInitDoneActionType => ({type: SET_INIT_DONE});

export const makeInit = () => (dispatch: any) => {
    let promise = dispatch(getAuth());

    Promise.all([promise]).then(() => {
        dispatch(setInitDone());
    })
}

export default authReducer;