const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            state.postsData.push({id: 5, text: state.newPostText, likes: 0});
            state.newPostText = '';
            break;
        case UPDATE_NEW_POST:
            if (action.text === '' || action.text === undefined) {
                return state;
            }

            state.newPostText = action.text;
            break;
        default:
            break;
    }

    return state;
}

export const addPostCreator = () => ({type: ADD_POST});
export const updateNewPostCreator = (text) => ({type: UPDATE_NEW_POST, text: text});

export default profileReducer;