import {Api} from '../components/API/api';
import {baseThunkType, contactsType, photosType, postsDataType, profileType} from '../types';
import {inferActionsType} from '../redux/reduxStore';
import {nanoid} from 'nanoid';
import {emptyErrorCallback, emptyStatusCallback, setErrors, setErrorsType, setStatusType} from '../utils/formikSetters';

export type initialStateType = {
    postsData: Array<postsDataType>,
    profile: profileType | null,
    ownerProfile: profileType | null,
    statusFetching: boolean,
    status: string
}

type actionsType = inferActionsType<typeof profileActions>;
type thunkType = baseThunkType<actionsType>;

const initialState: initialStateType = {
    postsData: [
        {id: nanoid(), text: 'First post!', likes: 15},
        {id: nanoid(), text: 'Second post!', likes: 20},
    ],
    profile: null,
    ownerProfile: null,
    statusFetching: false,
    status: ''
};

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            if (action.newPost === undefined || action.newPost.replace(/\s+/g, '') === '') {
                return state;
            }

            return {
                ...state,
                postsData: [...state.postsData, {id: nanoid(), text: action.newPost, likes: 0}]
            };
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state, postsData: state.postsData.filter(post => {
                    return post.id !== action.postId;
                })
            };
        case 'SN/PROFILE/SET_PROFILE':
            return {...state, profile: action.profile};
        case 'SN/PROFILE/SET_OWNER_PROFILE':
            return {...state, ownerProfile: action.profile};
        case 'SN/PROFILE/UPDATE_PROFILE':
            let newProfile = {
                ...(state.profile! as profileType),
                ...action.profile,
                contacts: {...(state.profile!["contacts"] as contactsType), ...action.profile.contacts}
            };

            return {
                ...state,
                profile: newProfile,
                ownerProfile: newProfile
            };
        case 'SN/PROFILE/SET_STATUS':
            return {...state, status: action.status};
        case 'SN/PROFILE/TOGGLE_STATUS_FETCHING':
            return {...state, statusFetching: !state.statusFetching};
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...(state.profile! as profileType), photos: action.photos},
                ownerProfile: {...(state.ownerProfile! as profileType), photos: action.photos}
            };
        case 'SN/PROFILE/ADD_LIKE':
            return {...state, postsData: state.postsData.map((post) => {
                return post.id === action.postId ? {...post, likes: post.likes+1} : post;
                })}
        default:
            return state;
    }
}

export const profileActions = {
    sendPost: (newPost: string) => ({type: 'SN/PROFILE/ADD_POST', newPost} as const),
    deletePost: (postId: string) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setProfile: (profile: profileType) => ({type: 'SN/PROFILE/SET_PROFILE', profile} as const),
    setOwnersProfile: (profile: profileType) => ({type: 'SN/PROFILE/SET_OWNER_PROFILE', profile} as const),
    updateProfile: (profile: profileType) => ({type: 'SN/PROFILE/UPDATE_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    toggleStatusFetching: () => ({type: 'SN/PROFILE/TOGGLE_STATUS_FETCHING'} as const),
    savePhotoSuccess: (photos: photosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
    addLike: (postId: string) => ({type: 'SN/PROFILE/ADD_LIKE', postId} as const),
}

/**
 * Requests status from api and set it to state.
 * @param {number} userId - user ID as number, if not valid will set owner ID
 */
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

/**
 * Saves new status via API  and update it's in state.
 * @param {string} status - text of status
 */
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

/**
 * Requests user profile from api and set it to state.
 * If requested owners profile, it will returned from state.
 * @param {number} userId - user ID as number, if not valid will set owner ID
 */
export const getProfile = (userId: number): thunkType => async (dispatch, getState) => {
    const ownerId = getState().auth.id;
    const id = userId || ownerId;

    if (!id) {
        return;
    }

    const ownerProfile = getState().profilePage.ownerProfile;

    if (id === ownerId && ownerProfile !== null) {
        dispatch(profileActions.setProfile({...ownerProfile}));
        return;
    }

    let data = await Api.Profile.getProfile(id);

    if (data === null) {
        return;
    }

    dispatch(profileActions.setProfile(data));
}

/**
 * Requests owner profile from api and set it to state.
 */
export const getOwnerProfile = (): thunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;

    if (!userId) {
        return;
    }

    let data = await Api.Profile.getProfile(userId);

    if (data === null) {
        return;
    }

    dispatch(profileActions.setOwnersProfile(data));
}

/**
 * Saves new photo via API  and update it's in state.
 * @param {File} file - file data
 */
export const savePhoto = (file: File): thunkType => async (dispatch) => {
    let data = await Api.Profile.savePhoto(file);

    if (data === undefined) {
        return;
    }

    dispatch(profileActions.savePhotoSuccess(data));
}

/**
 * Saves new profile-data via API  and update it's in state.
 * @param {profileType} profile - whole profile object
 * @param {setErrorsType=} errorCallback - formik setErrors function (optional)
 * @param {setStatusType=} statusCallback - formik setStatus function (optional)
 */
export const saveProfile = (
    profile: profileType,
    errorCallback: setErrorsType = emptyErrorCallback,
    statusCallback: setStatusType = emptyStatusCallback
): thunkType => (dispatch) => {
    let promise = Api.Profile.saveProfile(profile);

    return promise.then(
        () => {
            dispatch(profileActions.updateProfile(profile));
            return Promise.resolve();
        },
        (data) => {
            setErrors(data, errorCallback, statusCallback)
            return Promise.reject('formHasErrors');
    });
}

export default profileReducer;