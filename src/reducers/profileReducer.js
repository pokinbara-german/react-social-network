import {Api} from "../components/API/api";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const SET_PROFILE = 'SET-PROFILE';
const SET_STATUS = 'SET-STATUS';
const TOGGLE_STATUS_FETCHING = 'TOGGLE-STATUS-FETCHING';

const initialState = {
    postsData: [
        {id: 1, text: 'Second post!', likes: 20},
        {id: 2, text: 'First post!', likes: 15},
    ],
    profile: null,
    statusFetching: false,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (action.newPost === undefined) {
                return state;
            }

            return {
                ...state,
                postsData: [...state.postsData, {id: 5, text: action.newPost, likes: 0}]
            };
        case DELETE_POST:
            return {...state, postsData: state.postsData.filter(post => {
                return post.id !== action.postId;
                })};
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case TOGGLE_STATUS_FETCHING:
            return {...state, statusFetching: !state.statusFetching};
        default:
            return state;
    }
}

export const sendPost = (newPost) => ({type: ADD_POST, newPost});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
const setProfile = (profile) => ({type: SET_PROFILE, profile});
const setStatus = (status) => ({type: SET_STATUS, status});
const toggleStatusFetching = () => ({type: TOGGLE_STATUS_FETCHING});

export const getStatus = (userId) => (dispatch) => {
    let id = userId || 16702;

    Api.Profile.getStatus(id)
        .then( data => {
            if (data === null) {
                return;
            }

            dispatch(setStatus(data));
        });
}

export const updateStatus = (status) => (dispatch) => {
    dispatch(toggleStatusFetching());

    Api.Profile.updateStatus(status)
        .then( data => {
            if (!data) {
                return;
            }

            dispatch(setStatus(status));
            dispatch(toggleStatusFetching());
        });
}

export const getProfile = (userId) => (dispatch) => {
    let id = userId || 16702;

    Api.Profile.getProfile(id)
        .then( data => {
            if (data === null) {
                return;
            }

            dispatch(setProfile(data));
        });
}

export default profileReducer;