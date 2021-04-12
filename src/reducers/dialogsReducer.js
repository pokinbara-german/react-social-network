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
            if (action.text === '' || action.text === undefined) {
                return state;
            }

            state.messageList.push({id: 4, text: action.text, userId: 1});
            break;
        default:
            break;
    }

    return state;
}

export const addMessageCreator = (text) => ({type: ADD_MESSAGE, text: text});

export default dialogReducer;