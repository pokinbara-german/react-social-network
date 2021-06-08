import {getAuth} from './authReducer';
import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType} from './types/types';

export type initialStageType = {
    initDone: boolean
}

type actionsType = inferActionsType<typeof appActions>;
type thunkType = baseThunkType<actionsType, void>;

const initialStage: initialStageType = {
    initDone: false
};

const authReducer = (state = initialStage, action: actionsType): initialStageType => {
    switch (action.type) {

        case 'SN/APP/SET_INIT_DONE':
            return {
                ...state,
                initDone: true
            }
        default:
            return state;
    }
}

export const appActions = {
    setInitDone: () => ({type: 'SN/APP/SET_INIT_DONE'} as const)
}

export const makeInit = (): thunkType => (dispatch) => {
    let promise = dispatch(getAuth());

    Promise.all([promise]).then(() => {
        dispatch(appActions.setInitDone());
    })
}

export default authReducer;