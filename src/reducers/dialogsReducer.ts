const ADD_MESSAGE = 'ADD-MESSAGE';

export type initialStageType = typeof initialStage;

type userListType = {
    id: number,
    name: string
}

type messageListType = {
    id: number,
    text: string,
    userId: number
}

type sendMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessage: string
}

const initialStage = {
    userList: [
        {id:1, name: 'Andrey'},
        {id:2, name: 'Sergey'},
        {id:3, name: 'Misha'}
    ] as Array<userListType>,
    messageList: [
        {id: 1, text: 'First!', userId: 1},
        {id: 2, text: 'Second!', userId: 2},
        {id: 3, text: 'Third!', userId: 1},
    ] as Array<messageListType>
};

const dialogReducer = (state = initialStage, action: sendMessageActionType): initialStageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messageList: [...state.messageList, {id: 4, text: action.newMessage, userId: 1}]
            };
        default:
            return state;
    }
}

export const sendMessage = (newMessage: string):sendMessageActionType => ({type: ADD_MESSAGE, newMessage});

export default dialogReducer;