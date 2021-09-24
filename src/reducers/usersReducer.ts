import {Api} from '../API/api';
import {baseThunkType, arrayOfNumbers, usersType, stringOrNull} from '../types';
import {inferActionsType} from '../redux/reduxStore';
import {Dispatch} from 'redux';

export type initialStateType = {
    users: Array<usersType>,
    currentPage: number,
    pageSize: number,
    isUsersFetching: boolean,
    followingInProgress: arrayOfNumbers,
    filter: filterType
}

export type filterType = {
    searchTerm: stringOrNull,
    friend: null | boolean
}
type actionsType = inferActionsType<typeof userActions>;
type thunkType = baseThunkType<actionsType>;

type apiMethodType = typeof Api.Users.follow | typeof Api.Users.unfollow;

const initialState: initialStateType = {
    users: [],
    currentPage: 0,
    pageSize: 12,
    isUsersFetching: false,
    followingInProgress: [],
    filter: {
        searchTerm: null,
        friend: null
    }
};

/**
 * Sets user with ID in list followed or unfollowed.
 * Returns new list of users.
 * @param {usersType} userObject - object of user from search
 * @param {number} userId - ID of profile
 * @param {boolean} status - true - is followed, false - is not
 */
function mapUserFollowingStatus(userObject: usersType, userId: number, status: boolean) {
        if (userObject.id === userId) {
            return {...userObject, followed: status}
        }
        return userObject;
}

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOWED':
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, true))
            }
        case 'SN/USERS/UNFOLLOWED':
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, false))
            }
        case 'SN/USERS/SET_SEARCH_TERM':
            return {
                ...state,
                filter: {...action.filter},
                users: [],
                currentPage: 0
            }
        case 'SN/USERS/USERS_LIST_RECEIVED':
            return {
                ...state,
                users: [...state.users, ...action.users],
                currentPage: ++state.currentPage
            }
        case 'SN/USERS/UPDATE_IS_USERS_FETCHING':
            return {...state, isUsersFetching: action.isUsersFetching}
        case 'SN/USERS/UPDATE_IS_FOLLOWING_FETCHING':
            return {
                ...state,
                followingInProgress:
                    action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const userActions = {
    /** Action after user following */
    followUser: (userId: number) => ({type: 'SN/USERS/FOLLOWED', userId} as const),
    /** Action after user unfollowing */
    unfollowUser: (userId: number) => ({type: 'SN/USERS/UNFOLLOWED', userId} as const),
    /** Action for set new search filter */
    setSearchFilter: (filter: filterType) => ({type: 'SN/USERS/SET_SEARCH_TERM', filter} as const),
    /** Action after users list was received from API */
    usersListReceived: (users: Array<usersType>) => ({type: 'SN/USERS/USERS_LIST_RECEIVED', users} as const),
    /** Action which sets status of users list receiving. true - in progress, false - is done */
    updateUsersFetching: (isUsersFetching: boolean) => ({
        type: 'SN/USERS/UPDATE_IS_USERS_FETCHING',
        isUsersFetching
    } as const),
    /** Action which sets status of users following\unfollowing process. true - in progress, false - is done */
    updateFollowingFetching: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/UPDATE_IS_FOLLOWING_FETCHING',
        isFetching,
        userId
    } as const)
}

/**
 * Gets one page of users from API and sets it to state.
 * @param {filterType} filter - search filter
 */
export const getUsers = (filter: filterType): thunkType => {
    return async (dispatch, getState) => {
        const currentPage = getState().usersPage.currentPage;
        const pageSize = getState().usersPage.pageSize;

        dispatch(userActions.updateUsersFetching(true));
        if (filter !== getState().usersPage.filter) {
            dispatch(userActions.setSearchFilter(filter));
        }

        let data = await Api.Users.getUsers(pageSize, currentPage, filter);

        dispatch(userActions.updateUsersFetching(false));

        if (data === null) {
            return;
        }

        dispatch(userActions.usersListReceived(data.items));
    }
}

/**
 * Make process of following or unfollowing wia API and sets result to state.
 * @param {number} userId - ID of user which will be followed\unfollowed
 * @param {Dispatch<actionsType>} dispatch - dispatch function
 * @param {apiMethodType} apiMethod - function of API
 * @param {function(number): actionsType} actionCreator - process which will be made
 */
const processFollowUnfollow = async (
    userId: number,
    dispatch: Dispatch<actionsType>,
    apiMethod: apiMethodType,
    actionCreator: (userId: number) => actionsType
) => {
    dispatch(userActions.updateFollowingFetching(true, userId));
    let isSuccessful = await apiMethod(userId);

    if (isSuccessful) {
        dispatch(actionCreator(userId));
    }

    dispatch(userActions.updateFollowingFetching(false, userId));
}

/**
 * Makes following process
 * @param {number} userId - ID of user which will be followed
 */
export const follow = (userId: number): thunkType => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.follow, userActions.followUser);
    }
}

/**
 * Makes unfollowing process
 * @param {number} userId - ID of user which will be unfollowed
 */
export const unfollow = (userId: number): thunkType => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.unfollow, userActions.unfollowUser);
    }
}

export default usersReducer;