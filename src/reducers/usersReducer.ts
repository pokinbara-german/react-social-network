import {Api} from '../components/API/api';
import {baseThunkType, arrayOfNumbers, usersType} from './types/types';
import {inferActionsType} from '../redux/reduxStore';
import {Dispatch} from 'redux';

export type initialStateType = {
    users: Array<usersType>,
    currentPage: number,
    pageSize: number,
    isUsersFetching: boolean,
    followingInProgress: arrayOfNumbers
}

type actionsType = inferActionsType<typeof userActions>;
type thunkType = baseThunkType<actionsType>;

type apiMethodType = typeof Api.Users.follow | typeof Api.Users.unfollow;

const initialState: initialStateType = {
    users: [],
    currentPage: 0,
    pageSize: 10,
    isUsersFetching: false,
    followingInProgress: []
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

export const getUsers = (pageSize: number, currentPage: number): thunkType => {
    return async (dispatch) => {
        dispatch(userActions.updateUsersFetching(true));
        dispatch(userActions.setNextPage());

        let data = await Api.Users.getUsers(pageSize, currentPage);

        if (data === null) {
            return;
        }

        dispatch(userActions.setUsers(data.items));
        dispatch(userActions.updateUsersFetching(false));
    }
}

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

export const follow = (userId: number): thunkType => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.follow, userActions.followUser);
    }
}

export const unfollow = (userId: number): thunkType => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.unfollow, userActions.unfollowUser);
    }
}

export default usersReducer;