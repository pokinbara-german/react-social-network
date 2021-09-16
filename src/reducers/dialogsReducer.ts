import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType, messageListType, userListType} from '../types';
import {Api} from '../components/API/api';

export type initialStateType = {
    userList: Array<userListType>,
    messageList: Array<messageListType>,
    currentChatId: number,
    newMessagesCount: number
};

type actionsType = inferActionsType<typeof dialogsActions>;
type thunkType = baseThunkType<actionsType>;

const initialState: initialStateType = {
    userList: [],
    messageList: [],
    currentChatId: 0,
    newMessagesCount: 0
};

const dialogsReducer = (state = initialState, action: actionsType): initialStateType => {
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
        case 'SN/DIALOGS/NEW_MESSAGES_COUNT_RECEIVED':
            return {
                ...state,
                newMessagesCount: action.payload
            }
        case 'SN/DIALOGS/CHAT_MESSAGES_READ': {
            let messagesWasRead = 0;
            return {
                ...state,
                userList: state.userList.map(userItem => {
                    if (action.payload === userItem.id) {
                        messagesWasRead = userItem.newMessagesCount;
                        userItem.newMessagesCount = 0;
                        userItem.hasNewMessages = false;
                    }

                    return userItem;
                }),
                newMessagesCount: state.newMessagesCount >= messagesWasRead ? state.newMessagesCount - messagesWasRead : 0
            }
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
    chatMessagesRead: (chatId: number) => ({type: 'SN/DIALOGS/CHAT_MESSAGES_READ', payload: chatId} as const),
    newMessagesCountReceived: (count: number) => ({type: 'SN/DIALOGS/NEW_MESSAGES_COUNT_RECEIVED', payload: count} as const),
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

export const getNewMessagesCount = (): thunkType => async (dispatch) => {
    let data = await Api.Dialogs.getNewMessagesCount();

    dispatch(dialogsActions.newMessagesCountReceived(data));
}

export default dialogsReducer;