const ADD_MESSAGE = 'ADD-MESSAGE';

const dialogReducer = (state, action) => {
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