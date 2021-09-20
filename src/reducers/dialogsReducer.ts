import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType, messageListType, userListType} from '../types';
import {Api} from '../components/API/api';
import he from 'he';

export type initialStateType = {
    userList: Array<userListType>,
    messageList: Array<messageListType>,
    currentDialogId: number,
    currentDialogPage: number,
    currentDialogHasMore: boolean,
    newMessagesCount: number
};

type actionsType = inferActionsType<typeof dialogsActions>;
type thunkType = baseThunkType<actionsType>;

const initialState: initialStateType = {
    userList: [],
    messageList: [],
    currentDialogId: 0,
    currentDialogPage: 0,
    currentDialogHasMore: false,
    newMessagesCount: 0
};

/**
 * Unescape HTML-entities in every message body.
 * Returns new array.
 * @param {Array<messageListType>} messagesList - list of messages from API
 */
function getUnescapedMessages(messagesList: Array<messageListType>): Array<messageListType> {
    return  messagesList.map(message => {
        let unescapedMessage = {...message};
        unescapedMessage.body = he.unescape(message.body);
        return unescapedMessage;
    })
}

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
                messageList: [...getUnescapedMessages(action.payload), ...state.messageList],
                currentDialogPage: state.currentDialogPage + 1
            }
        case 'SN/DIALOGS/CHAT_CHANGED':
            return {
                ...state,
                currentDialogId: action.payload,
                messageList: [],
                currentDialogPage: 0,
                currentDialogHasMore: false
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
        case 'SN/DIALOGS/HAS_NEW_MESSAGES_CHANGED':
            return {
                ...state,
                currentDialogHasMore: action.payload > state.messageList.length
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
    countMessagesChanged: (count: number) => ({type: 'SN/DIALOGS/HAS_NEW_MESSAGES_CHANGED', payload: count} as const),
}

/**
 * Requests list of dialogs from api and set it to state.
 */
export const getDialogsList = (): thunkType => async (dispatch) => {
    let data = await Api.Dialogs.getDialogsList();

    if (!data || !data.length) {
        dispatch(dialogsActions.dialogsListReceived([]));
        return;
    }

    dispatch(dialogsActions.dialogsListReceived(data));
}

/**
 * Add new user in dialogs list or set it first if existing.
 * Reload dialogs list from API.
 * @param {number} userId - opponent ID
 */
export const startRefreshDialog = (userId: number): thunkType => async (dispatch) => {
    let isSuccessful = await Api.Dialogs.startRefreshDialog(userId);

    if (isSuccessful) {
        await dispatch(getDialogsList());
    }
}

/**
 * Requests list of messages from api and set it to state.
 * @param {number} userId - opponent ID
 */
export const getMessagesList = (userId: number): thunkType => async (dispatch, getState) => {
    const dialogsPage = getState().dialogsPage;
    let data = await Api.Dialogs.getMessagesList(userId, dialogsPage.currentDialogPage);

    if (!data) {
        return;
    }

    dispatch(dialogsActions.messagesListReceived(data.items));
    dispatch(dialogsActions.countMessagesChanged(data.totalCount));
}

/**
 * Send new message to current dialog.
 * @param {string} text - text of message
 */
export const sendMessage = (text: string): thunkType => async (dispatch, getState) => {
    let userId = getState().dialogsPage.currentDialogId;
    let data = await Api.Dialogs.sendMessage(userId, text);

    if (!data) {
        return;
    }

    dispatch(dialogsActions.messageSent(data));
}

/**
 * Requests counter of new messages from api and set it to state.
 */
export const getNewMessagesCount = (): thunkType => async (dispatch, getState) => {
    const isAuthorized = getState().auth.isAuth;

    if (!isAuthorized) {
        return;
    }

    let data = await Api.Dialogs.getNewMessagesCount();

    dispatch(dialogsActions.newMessagesCountReceived(data));
}

export default dialogsReducer;