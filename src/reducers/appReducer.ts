import {getAuth} from './authReducer';
import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType} from '../types';
import {getNewMessagesCount} from './dialogsReducer';
import {getOwnerProfile} from './profileReducer';

export type initialStateType = {
    initDone: boolean
}

type actionsType = inferActionsType<typeof appActions>;
type thunkType = baseThunkType<actionsType, void>;

const initialState: initialStateType = {
    initDone: false
};

const authReducer = (state = initialState, action: actionsType): initialStateType => {
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
    let auth = dispatch(getAuth());

    Promise.all([auth]).then(() => {
        dispatch(appActions.setInitDone());
    })
}

export const getInfoAfterLogin = (): thunkType => async (dispatch) => {
    await dispatch(getNewMessagesCount());
    await dispatch(getOwnerProfile());
}

export default authReducer;