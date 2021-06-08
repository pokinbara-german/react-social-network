import {Api} from '../components/API/api';
import {stopSubmit} from 'redux-form';
import {baseThunkType, contactsType, photosType, postsDataType, profileType} from './types/types';
import {inferActionsType} from '../redux/reduxStore';

export type initialStateType = {
    postsData: Array<postsDataType>,
    profile: profileType | null,
    statusFetching: boolean,
    status: string
}

type actionsType = inferActionsType<typeof profileActions>;
type thunkType = baseThunkType<actionsType>;

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
        case 'SN/PROFILE/ADD_POST':
            if (action.newPost === undefined) {
                return state;
            }

            return {
                ...state,
                postsData: [...state.postsData, {id: 5, text: action.newPost, likes: 0}]
            };
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state, postsData: state.postsData.filter(post => {
                    return post.id !== action.postId;
                })
            };
        case 'SN/PROFILE/SET_PROFILE':
            return {...state, profile: action.profile};
        case 'SN/PROFILE/UPDATE_PROFILE':
            return {
                ...state,
                profile: {
                    ...(state.profile! as profileType),
                    ...action.profile,
                    contacts: {...(state.profile!["contacts"] as contactsType), ...action.profile.contacts}
                }
            };
        case 'SN/PROFILE/SET_STATUS':
            return {...state, status: action.status};
        case 'SN/PROFILE/TOGGLE_STATUS_FETCHING':
            return {...state, statusFetching: !state.statusFetching};
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...(state.profile! as profileType), photos: action.photos}};
        default:
            return state;
    }
}

export const profileActions = {
    sendPost: (newPost: string) => ({type: 'SN/PROFILE/ADD_POST', newPost} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setProfile: (profile: profileType) => ({type: 'SN/PROFILE/SET_PROFILE', profile} as const),
    updateProfile: (profile: profileType) => ({type: 'SN/PROFILE/UPDATE_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    toggleStatusFetching: () => ({type: 'SN/PROFILE/TOGGLE_STATUS_FETCHING'} as const),
    savePhotoSuccess: (photos: photosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getStatus = (userId: number): thunkType => async (dispatch, getState) => {
    let id = userId || getState().auth.id;

    if (!id) {
        return;
    }

    let data = await Api.Profile.getStatus(id);

    if (data === null) {
        dispatch(profileActions.setStatus(''));
        return;
    }

    dispatch(profileActions.setStatus(data));
}

export const updateStatus = (status: string): thunkType => async (dispatch) => {
    dispatch(profileActions.toggleStatusFetching());

    try {
        let data = await Api.Profile.updateStatus(status);

        if (!data) {
            return;
        }

        dispatch(profileActions.setStatus(status));
    } catch (reason) {
        //TODO: переписать на нормальный вывод ошибки
        alert('Не удалось сохранить статус, попробуйте позже!');
    }

    dispatch(profileActions.toggleStatusFetching());
}

export const getProfile = (userId: number): thunkType => async (dispatch, getState) => {
    let id = userId || getState().auth.id;

    if (!id) {
        return;
    }

    let data = await Api.Profile.getProfile(id);

    if (data === null) {
        return;
    }

    dispatch(profileActions.setProfile(data));
}

export const savePhoto = (file: File): thunkType => async (dispatch) => {
    let data = await Api.Profile.savePhoto(file);

    if (data === undefined) {
        return;
    }

    dispatch(profileActions.savePhotoSuccess(data));
}

export const saveProfile = (profile: profileType): thunkType => async (dispatch) => {
    let data = await Api.Profile.saveProfile(profile);

    if (data.length) {
        dispatch(stopSubmit('profileInfo', {_error: data}));
        return Promise.reject(data);
    }

    dispatch(profileActions.updateProfile(profile));
}

export default profileReducer;