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
    newMessagesCount: number,
    isDialogsFetching: boolean,
    isMessagesFetching: boolean,
};

type actionsType = inferActionsType<typeof dialogsActions>;
type thunkType = baseThunkType<actionsType>;

const initialState: initialStateType = {
    userList: [],
    messageList: [],
    currentDialogId: 0,
    currentDialogPage: 0,
    currentDialogHasMore: false,
    newMessagesCount: 0,
    isDialogsFetching: false,
    isMessagesFetching: false,
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
        unescapedMessage.body = unescapedMessage.body.replace(/<br \/>/g, '\n');
        return unescapedMessage;
    })
}

const dialogsReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/MESSAGE_SENT':
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
        case 'SN/DIALOGS/COUNT_MESSAGES_CHANGED':
            return {
                ...state,
                currentDialogHasMore: action.payload > state.messageList.length
            }
        case 'SN/DIALOGS/UPDATE_IS_DIALOGS_FETCHING':
            return {
                ...state,
                isDialogsFetching: action.payload
            }
        case 'SN/DIALOGS/UPDATE_IS_MESSAGES_FETCHING':
            return {
                ...state,
                isMessagesFetching: action.payload
            }
        default:
            return state;
    }
}

export const dialogsActions = {
    /** Action after message sending */
    messageSent: (newMessage: messageListType) => ({type: 'SN/DIALOGS/MESSAGE_SENT', newMessage} as const),
    /** Action after list of dialogs was received from API */
    dialogsListReceived: (list: Array<userListType>) => ({type: 'SN/DIALOGS/DIALOGS_LIST_RECEIVED', payload: list} as const),
    /** Action after list messages was received from API */
    messagesListReceived: (list: Array<messageListType>) => ({type: 'SN/DIALOGS/MESSAGES_LIST_RECEIVED', payload: list} as const),
    /** Action after change of dialog opponent */
    chatChanged: (chatId: number) => ({type: 'SN/DIALOGS/CHAT_CHANGED', payload: chatId} as const),
    /** Action after read messages in current dialog */
    chatMessagesRead: (chatId: number) => ({type: 'SN/DIALOGS/CHAT_MESSAGES_READ', payload: chatId} as const),
    /** Action after counter of unread messages was received from API */
    newMessagesCountReceived: (count: number) => ({type: 'SN/DIALOGS/NEW_MESSAGES_COUNT_RECEIVED', payload: count} as const),
    /** Action after change count of messages in messages list */
    countMessagesChanged: (count: number) => ({type: 'SN/DIALOGS/COUNT_MESSAGES_CHANGED', payload: count} as const),
    /** Action which sets status of dialogs list receiving. true - in progress, false - is done */
    updateDialogsFetching: (isDialogsFetching: boolean) => ({
        type: 'SN/DIALOGS/UPDATE_IS_DIALOGS_FETCHING',
        payload: isDialogsFetching
    } as const),
    /** Action which sets status of messages list receiving. true - in progress, false - is done */
    updateMessagesFetching: (isMessagesFetching: boolean) => ({
        type: 'SN/DIALOGS/UPDATE_IS_MESSAGES_FETCHING',
        payload: isMessagesFetching
    } as const),
}

/**
 * Requests list of dialogs from api and set it to state.
 */
export const getDialogsList = (): thunkType => async (dispatch) => {
    dispatch(dialogsActions.updateDialogsFetching(true));
    let data = await Api.Dialogs.getDialogsList();

    if (!data || !data.length) {
        dispatch(dialogsActions.dialogsListReceived([]));
        return;
    }

    dispatch(dialogsActions.dialogsListReceived(data));
    dispatch(dialogsActions.updateDialogsFetching(false));
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
    dispatch(dialogsActions.updateMessagesFetching(true));
    let data = await Api.Dialogs.getMessagesList(userId, dialogsPage.currentDialogPage);

    if (!data) {
        return;
    }

    dispatch(dialogsActions.messagesListReceived(data.items));
    dispatch(dialogsActions.countMessagesChanged(data.totalCount));
    dispatch(dialogsActions.updateMessagesFetching(false));
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