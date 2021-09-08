import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType, messageListType, userListType} from '../types';
import {Api} from '../components/API/api';

export type initialStateType = {
    userList: Array<userListType>,
    messageList: Array<messageListType>,
    currentChatId: number
};

type actionsType = inferActionsType<typeof dialogsActions>;
type thunkType = baseThunkType<actionsType>;

const initialState: initialStateType = {
    userList: [],
    messageList: [],
    currentChatId: 0
};

const dialogReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE':
            return {
                ...state,
                messageList: [...state.messageList, {...action.newMessage}]
            };
        case 'SN/DIALOGS/DIALOGS_LIST_RECEIVED':
            return {
                ...state,
                userList: [...action.payload]
            }
        case 'SN/DIALOGS/MESSAGES_LIST_RECEIVED':
            return {
                ...state,
                messageList: [...action.payload]
            }
        case 'SN/DIALOGS/CHAT_CHANGED':
            return {
                ...state,
                currentChatId: action.payload
            }
        default:
            return state;
    }
}

export const dialogsActions = {
    messageSent: (newMessage: messageListType) => ({type: 'SN/DIALOGS/ADD_MESSAGE', newMessage} as const),
    dialogsListReceived: (list: Array<userListType>) => ({type: 'SN/DIALOGS/DIALOGS_LIST_RECEIVED', payload: list} as const),
    messagesListReceived: (list: Array<messageListType>) => ({type: 'SN/DIALOGS/MESSAGES_LIST_RECEIVED', payload: list} as const),
    chatChanged: (chatId: number) => ({type: 'SN/DIALOGS/CHAT_CHANGED', payload: chatId} as const),
}

export const getDialogsList = (): thunkType => async (dispatch) => {
    let data = await Api.Dialogs.getDialogsList();

    if (!data || !data.length) {
        dispatch(dialogsActions.dialogsListReceived([]));
        return;
    }

    dispatch(dialogsActions.dialogsListReceived(data));
}

export const startRefreshDialog = (userId: number): thunkType => async (dispatch) => {
    let isSuccessful = await Api.Dialogs.startRefreshDialog(userId);

    if (isSuccessful) {
        await dispatch(getDialogsList());
    }
}

export const getMessagesList = (userId: number): thunkType => async (dispatch) => {
    let data = await Api.Dialogs.getMessagesList(userId);

    if (!data) {
        return;
    }

    dispatch(dialogsActions.messagesListReceived(data));
}

export const sendMessage = (text: string): thunkType => async (dispatch, getState) => {
    let userId = getState().dialogsPage.currentChatId;
    let data = await Api.Dialogs.sendMessage(userId, text);

    if (!data) {
        return;
    }

    dispatch(dialogsActions.messageSent(data));
}

export default dialogReducer;