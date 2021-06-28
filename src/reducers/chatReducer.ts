import {inferActionsType} from '../redux/reduxStore';
import {baseThunkType} from './types/types';
import {chatApi, messageType} from '../components/API/chat-api';
import {Dispatch} from 'redux';

export type initialStateType = {
    messages: Array<messageType>
};

type actionsType = inferActionsType<typeof chatActions>;
type thunkType = baseThunkType<actionsType, void>;

const initialState: initialStateType = {
    messages: []
};

const chatReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            };
        case 'SN/CHAT/CHAT_CLEARED':
            return {
                ...state,
                messages: []
            }
        default:
            return state;
    }
}

export const chatActions = {
    messagesReceived: (messages: Array<messageType>) => ({type: 'SN/CHAT/MESSAGES_RECEIVED', payload: messages} as const),
    chatCleared: () => ({type: 'SN/CHAT/CHAT_CLEARED'} as const)
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

export const startMessagesListening = (): thunkType => (dispatch) => {
    chatApi.connect();
    chatApi.subscribe(messageHandlerCreator(dispatch));
}

export const stopMessagesListening = (): thunkType => (dispatch) => {
    chatApi.unsubscribe(messageHandlerCreator(dispatch));
    dispatch(chatActions.chatCleared());
    chatApi.disconnect();
}

export const sendMessage = (message: string): thunkType => (dispatch) => {
    chatApi.sendMessage(message);
}

export default chatReducer;