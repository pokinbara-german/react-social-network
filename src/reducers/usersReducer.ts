import {Api} from "../components/API/api";
import {followingInProgressType, usersType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType, inferActionsType} from "../redux/reduxStore";
import {Dispatch} from "redux";

export type initialStageType = {
    users: Array<usersType>,
    currentPage: number,
    pageSize: number,
    isUsersFetching: boolean,
    followingInProgress: followingInProgressType
}

const initialStage: initialStageType = {
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

const usersReducer = (state = initialStage, action: actionsType): initialStageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, true))
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, false))
            }
        case 'SET_USERS':
            return {...state, users: [...state.users, ...action.users]}
        case 'NEXT_PAGE':
            return {...state, currentPage: ++state.currentPage}
        case 'UPDATE_IS_USERS_FETCHING':
            return {...state, isUsersFetching: action.isUsersFetching}
        case 'UPDATE_IS_FOLLOWING_FETCHING':
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

type actionsType = inferActionsType<typeof userActions>;

export const userActions = {
    followUser: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowUser: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<usersType>) => ({type: 'SET_USERS', users} as const),
    setNextPage: () => ({type: 'NEXT_PAGE'} as const),
    updateUsersFetching: (isUsersFetching: boolean) => ({
        type: 'UPDATE_IS_USERS_FETCHING',
        isUsersFetching
    } as const),
    updateFollowingFetching: (isFetching: boolean, userId: number) => ({
        type: 'UPDATE_IS_FOLLOWING_FETCHING',
        isFetching,
        userId
    } as const)
}

type thunkType = ThunkAction<Promise<void>, appStateType, any, actionsType>;

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
    apiMethod: any,
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