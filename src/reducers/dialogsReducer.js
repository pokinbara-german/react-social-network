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
    let newState = {...state};
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.newMessageText === '') {
                return state;
            }

            newState.messageList = [...state.messageList];
            newState.messageList.push({id: 4, text: newState.newMessageText, userId: 1});
            newState.newMessageText = '';
            return newState;
        case UPDATE_NEW_MESSAGE:
            if (action.text === undefined) {
                return state;
            }

            newState.newMessageText = action.text;
            return newState;
        default:
            return state;
    }
}

export const addMessageCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageCreator = (text) => ({type: UPDATE_NEW_MESSAGE, text: text});

export default dialogReducer;