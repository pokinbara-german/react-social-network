import {Api} from "../components/API/api";
import {stopSubmit} from "redux-form";
import {contactsType, photosType, profileType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType} from "../redux/reduxStore";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const SET_PROFILE = 'SET-PROFILE';
const UPDATE_PROFILE = 'UPDATE-PROFILE';
const SET_STATUS = 'SET-STATUS';
const TOGGLE_STATUS_FETCHING = 'TOGGLE-STATUS-FETCHING';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

type postsDataType = {
    id: number,
    text: string,
    likes: number
}

export type initialStateType = {
    postsData: Array<postsDataType>,
    profile: profileType | null,
    statusFetching: boolean,
    status: string
}

type actionsType = sendPostActionType
    | deletePostActionType
    | setProfileActionType
    | updateProfileActionType
    | setStatusActionType
    | toggleStatusFetchingActionType
    | savePhotoSuccessActionType;

const initialState: initialStateType = {
    postsData: [
        {id: 1, text: 'Second post!', likes: 20},
        {id: 2, text: 'First post!', likes: 15},
    ],
    profile: null,
    statusFetching: false,
    status: ''
};

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
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
            return {
                ...state, postsData: state.postsData.filter(post => {
                    return post.id !== action.postId;
                })
            };
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: {
                    ...(state.profile! as profileType),
                    ...action.profile,
                    contacts: {...(state.profile!["contacts"] as contactsType), ...action.profile.contacts}
                }
            };
        case SET_STATUS:
            return {...state, status: action.status};
        case TOGGLE_STATUS_FETCHING:
            return {...state, statusFetching: !state.statusFetching};
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...(state.profile! as profileType), photos: action.photos}};
        default:
            return state;
    }
}

type sendPostActionType = {
    type: typeof ADD_POST,
    newPost: string
}

type deletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}

type setProfileActionType = {
    type: typeof SET_PROFILE,
    profile: profileType
}

type updateProfileActionType = {
    type: typeof UPDATE_PROFILE,
    profile: profileType
}

type setStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

type toggleStatusFetchingActionType = {
    type: typeof TOGGLE_STATUS_FETCHING
}

type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: photosType
}

type thunkType = ThunkAction<Promise<void>, appStateType, any, actionsType>;

export const sendPost = (newPost: string): sendPostActionType => ({type: ADD_POST, newPost});
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId});
const setProfile = (profile: profileType): setProfileActionType => ({type: SET_PROFILE, profile});
const updateProfile = (profile: profileType): updateProfileActionType => ({type: UPDATE_PROFILE, profile});
const setStatus = (status: string): setStatusActionType => ({type: SET_STATUS, status});
const toggleStatusFetching = (): toggleStatusFetchingActionType => ({type: TOGGLE_STATUS_FETCHING});
const savePhotoSuccess = (photos: photosType): savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getStatus = (userId: number) => async (dispatch: any) => {
    let id = userId || 16702;

    let data = await Api.Profile.getStatus(id);

    if (data === null) {
        return dispatch(setStatus(''));
    }

    dispatch(setStatus(data));
}

export const updateStatus = (status: string): thunkType => async (dispatch) => {
    dispatch(toggleStatusFetching());

    try {
        let data = await Api.Profile.updateStatus(status);

        if (!data) {
            return;
        }

        dispatch(setStatus(status));
    } catch (reason) {
        //TODO: переписать на нормальный вывод ошибки
        alert('Не удалось сохранить статус, попробуйте позже!');
    }

    dispatch(toggleStatusFetching());
}

export const getProfile = (userId: number): thunkType => async (dispatch) => {
    let id = userId || 16702;

    let data = await Api.Profile.getProfile(id);

    if (data === null) {
        return;
    }

    dispatch(setProfile(data));
}

export const savePhoto = (file: File): thunkType => async (dispatch) => {
    let data = await Api.Profile.savePhoto(file);

    if (data === undefined) {
        return;
    }

    dispatch(savePhotoSuccess(data));
}

export const saveProfile = (profile: profileType): thunkType => async (dispatch) => {
    let data = await Api.Profile.saveProfile(profile);

    if (data.length) {
        dispatch(stopSubmit('profileInfo', {_error: data}));
        return Promise.reject(data);
    }

    dispatch(updateProfile(profile));
}

export default profileReducer;