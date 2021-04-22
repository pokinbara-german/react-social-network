const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST = 'UPDATE-NEW-POST';

const initialState = {
    postsData: [
        {id: 1, text: 'Second post!', likes: 20},
        {id: 2, text: 'First post!', likes: 15},
    ],
    newPostText: 'dasfasfasf'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText === '') {
                return state;
            }

            return {
                ...state,
                postsData: [...state.postsData, {id: 5, text: state.newPostText, likes: 0}],
                newPostText: ''
            };
        case UPDATE_NEW_POST:
            if (action.text === undefined) {
                return state;
            }

            return {
                ...state,
                newPostText: action.text
            };
        default:
            return state;
    }
}

export const sendPost = () => ({type: ADD_POST});
export const updatePostMessage = (text) => ({type: UPDATE_NEW_POST, text: text});

export default profileReducer;