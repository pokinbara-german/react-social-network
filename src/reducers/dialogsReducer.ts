import {inferActionsType} from '../redux/reduxStore';

export type initialStateType = {
    userList: Array<userListType>,
    messageList: Array<messageListType>
};

type userListType = {
    id: number,
    name: string
}

type messageListType = {
    id: number,
    text: string,
    userId: number
}

type actionsType = inferActionsType<typeof dialogsActions>;

const initialState: initialStateType = {
    userList: [
        {id:1, name: 'Andrey'},
        {id:2, name: 'Sergey'},
        {id:3, name: 'Misha'}
    ],
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
        default:
            return state;
    }
}

export const dialogsActions = {
    sendMessage: (newMessage: string) => ({type: 'SN/DIALOGS/ADD_MESSAGE', newMessage} as const)
}

export default dialogReducer;