import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType, userListType} from '../types';
import {Api} from '../components/API/api';

export type initialStateType = {
    userList: Array<userListType>,
    messageList: Array<messageListType>
};

type messageListType = {
    id: number,
    text: string,
    userId: number
}

type actionsType = inferActionsType<typeof dialogsActions>;
type thunkType = baseThunkType<actionsType>;

const initialState: initialStateType = {
    userList: [],
    messageList: [
        {id: 1, text: 'First!', userId: 1},
        {id: 2, text: 'Second!', userId: 2},
        {id: 3, text: 'Third!', userId: 1},
    ]
};

const dialogReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE':
            return {
                ...state,
                messageList: [...state.messageList, {id: 4, text: action.newMessage, userId: 1}]
            };
        case 'SN/DIALOGS/DIALOGS_LIST_RECEIVED':
            return {
                ...state,
                userList: [...action.list]
            }
        default:
            return state;
    }
}

export const dialogsActions = {
    sendMessage: (newMessage: string) => ({type: 'SN/DIALOGS/ADD_MESSAGE', newMessage} as const),
    dialogsListReceived: (list: Array<userListType>) => ({type: 'SN/DIALOGS/DIALOGS_LIST_RECEIVED', list} as const),
}

export const getDialogsList = (): thunkType => async (dispatch) => {
    let data = await Api.Dialogs.getDialogsList();

    if (!data || !data.length) {
        dispatch(dialogsActions.dialogsListReceived([]));
        return;
    }

    dispatch(dialogsActions.dialogsListReceived(data));
}

export const startRefreshDialog = (userId: number): thunkType => async (dipatch) => {
    let isSuccessful = await Api.Dialogs.startRefreshDialog(userId);

    if (isSuccessful) {
        await dipatch(getDialogsList());
    }
}

export default dialogReducer;