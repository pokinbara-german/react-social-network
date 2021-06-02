import {getAuth} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {appStateType} from "../redux/reduxStore";

const SET_INIT_DONE = 'SET-INIT-DONE';

export type initialStageType = {
    initDone: boolean
}

type setInitDoneActionType = {
    type: typeof SET_INIT_DONE
}

type actionsType = setInitDoneActionType;

type thunkType = ThunkAction<void, appStateType, any, actionsType>;

const initialStage: initialStageType = {
    initDone: false
};

const authReducer = (state = initialStage, action: actionsType): initialStageType => {
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

export const makeInit = (): thunkType => (dispatch) => {
    let promise = dispatch(getAuth());

    Promise.all([promise]).then(() => {
        dispatch(setInitDone());
    })
}

export default authReducer;