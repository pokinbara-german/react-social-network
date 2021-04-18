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
    let newState = {...state};
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText === '') {
                return state;
            }

            newState.postsData = [...state.postsData];
            newState.postsData.push({id: 5, text: state.newPostText, likes: 0});
            newState.newPostText = '';
            return newState;
        case UPDATE_NEW_POST:
            if (action.text === undefined) {
                return state;
            }

            newState.newPostText = action.text;
            return newState;
        default:
            return state;
    }
}

export const addPostCreator = () => ({type: ADD_POST});
export const updateNewPostCreator = (text) => ({type: UPDATE_NEW_POST, text: text});

export default profileReducer;