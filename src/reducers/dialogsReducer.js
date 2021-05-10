const ADD_MESSAGE = 'ADD-MESSAGE';

const initialStage = {
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

const dialogReducer = (state = initialStage, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.newMessageText === '') {
                return state;
            }

            return {
                ...state,
                messageList: [...state.messageList, {id: 4, text: action.newMessage, userId: 1}]
            };
        default:
            return state;
    }
}

export const sendMessage = (newMessage) => ({type: ADD_MESSAGE, newMessage});

export default dialogReducer;