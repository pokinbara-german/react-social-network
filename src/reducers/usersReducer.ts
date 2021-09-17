import {Api} from '../components/API/api';
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

function mapUserFollowingStatus(userObject: usersType, userId: number, status: boolean) {
        if (userObject.id === userId) {
            return {...userObject, followed: status}
        }
        return userObject;
}

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, true))
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, false))
            }
        case 'SN/USERS/ZERO_NEXT_PAGE':
            return {...state, currentPage: 0};
        case 'SN/USERS/SET_SEARCH_TERM':
            return {...state, filter: {...action.filter}, users: []};
        case 'SN/USERS/SET_USERS':
            return {...state, users: [...state.users, ...action.users]}
        case 'SN/USERS/NEXT_PAGE':
            return {...state, currentPage: ++state.currentPage}
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
    followUser: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowUser: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    zeroNextPage: () => ({type: 'SN/USERS/ZERO_NEXT_PAGE'} as const),
    setSearchFilter: (filter: filterType) => ({type: 'SN/USERS/SET_SEARCH_TERM', filter} as const),
    setUsers: (users: Array<usersType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setNextPage: () => ({type: 'SN/USERS/NEXT_PAGE'} as const),
    updateUsersFetching: (isUsersFetching: boolean) => ({
        type: 'SN/USERS/UPDATE_IS_USERS_FETCHING',
        isUsersFetching
    } as const),
    updateFollowingFetching: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/UPDATE_IS_FOLLOWING_FETCHING',
        isFetching,
        userId
    } as const)
}

/**
 * Gets one page of users from API and sets it to state.
 * @param {number} pageSize - number of items in page
 * @param {number} currentPage - number of page
 * @param {filterType} filter - search filter
 */
export const getUsers = (pageSize: number, currentPage: number, filter: filterType): thunkType => {
    return async (dispatch, getState) => {
        dispatch(userActions.updateUsersFetching(true));
        if (filter !== getState().usersPage.filter) {
            dispatch(userActions.setSearchFilter(filter));
            dispatch(userActions.zeroNextPage());
        }

        //TODO: хранить currentPage в стейте и оттуда же доставать
        let data = await Api.Users.getUsers(pageSize, currentPage, filter);

        dispatch(userActions.updateUsersFetching(false));

        if (data === null) {
            return;
        }

        dispatch(userActions.setUsers(data.items));
        dispatch(userActions.setNextPage());
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