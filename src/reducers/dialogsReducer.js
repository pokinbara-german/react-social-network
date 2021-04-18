const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';

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
    ],
    newMessageText: ''
};

const dialogReducer = (state = initialStage, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.newMessageText === '') {
                return state;
            }

            return {
                ...state,
                messageList: [...state.messageList, {id: 4, text: state.newMessageText, userId: 1}],
                newMessageText: ''
            };
        case UPDATE_NEW_MESSAGE:
            if (action.text === undefined) {
                return state;
            }

            return {
                ...state,
                newMessageText: action.text
            };
        default:
            return state;
    }
}

export const addMessageCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageCreator = (text) => ({type: UPDATE_NEW_MESSAGE, text: text});

export default dialogReducer;