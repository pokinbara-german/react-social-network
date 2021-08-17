import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType} from '../types';
import {chatApi, messageType} from '../components/API/chat-api';
import {Dispatch} from 'redux';

/** @constant {number} Maximal number of posts in chat */
const MAX_CHAT_MESSAGES = 100;

export type initialStateType = {
    messages: Array<messageType>,
    isConnected: boolean
};

type actionsType = inferActionsType<typeof chatActions>;
type thunkType = baseThunkType<actionsType, void>;

const initialState: initialStateType = {
    messages: [],
    isConnected: false
};

const chatReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload].slice(-MAX_CHAT_MESSAGES)
            };
        case 'SN/CHAT/CHAT_CLEARED':
            return {
                ...state,
                messages: []
            };
        case 'SN/CHAT/CONNECTION_CHANGED':
            return {
                ...state,
                isConnected: action.payload
            };
        default:
            return state;
    }
}

export const chatActions = {
    messagesReceived: (messages: Array<messageType>) => ({type: 'SN/CHAT/MESSAGES_RECEIVED', payload: messages} as const),
    chatCleared: () => ({type: 'SN/CHAT/CHAT_CLEARED'} as const),
    connectionChanged: (isConnected: boolean) => ({type: 'SN/CHAT/CONNECTION_CHANGED', payload: isConnected} as const)
}

let _messageHandler: ((messages: Array<messageType>) => void) | null = null;

let messageHandlerCreator = (dispatch: Dispatch) => {
    if (_messageHandler === null) {
        _messageHandler = (messages) => {
            dispatch(chatActions.messagesReceived(messages));
        }
    }

    return _messageHandler;
};

let _connectionHandler: ((status: boolean) => void) | null = null;

let connectionHandlerCreator = (dispatch: Dispatch) => {
    if (_connectionHandler === null) {
        _connectionHandler = (status) => {
            dispatch(chatActions.connectionChanged(status));
        }
    }

    return _connectionHandler;
};

export const startMessagesListening = (): thunkType => (dispatch) => {
    chatApi.connect();
    chatApi.subscribe('message-received', messageHandlerCreator(dispatch));
    chatApi.subscribe('connection-changed', connectionHandlerCreator(dispatch));
}

export const stopMessagesListening = (): thunkType => (dispatch) => {
    chatApi.unsubscribe('message-received', messageHandlerCreator(dispatch));
    chatApi.unsubscribe('connection-changed', connectionHandlerCreator(dispatch));
    dispatch(chatActions.chatCleared());
    chatApi.disconnect();
}

export const sendMessage = (message: string): thunkType => () => {
    chatApi.sendMessage(message);
}

export default chatReducer;