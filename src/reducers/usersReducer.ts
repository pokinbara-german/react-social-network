import {Api} from "../components/API/api";
import {followingInProgressType, usersType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {appStateType} from "../redux/reduxStore";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const NEXT_PAGE = 'NEXT-PAGE';
const UPDATE_IS_USERS_FETCHING = 'UPDATE-IS-USERS-FETCHING';
const UPDATE_IS_FOLLOWING_FETCHING = 'UPDATE-IS-FOLLOWING-FETCHING';

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
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, true))
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => mapUserFollowingStatus(user, action.userId, false))
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        case NEXT_PAGE:
            return {...state, currentPage: ++state.currentPage}
        case UPDATE_IS_USERS_FETCHING:
            return {...state, isUsersFetching: action.isUsersFetching}
        case UPDATE_IS_FOLLOWING_FETCHING:
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

type followUserActionType = {
    type: typeof FOLLOW,
    userId: number
}

type unfollowUserActionType = {
    type: typeof UNFOLLOW,
    userId: number
}

type setUsersActionType = {
    type: typeof SET_USERS,
    users: Array<usersType>
}

type setNextPageActionType = {
    type: typeof NEXT_PAGE
}

type updateUsersFetchingActionType = {
    type: typeof UPDATE_IS_USERS_FETCHING,
    isUsersFetching: boolean
}

type updateFollowingFetchingActionType = {
    type: typeof UPDATE_IS_FOLLOWING_FETCHING,
    isFetching: boolean,
    userId: number
}

type actionsType = followUserActionType
    | unfollowUserActionType
    | setUsersActionType
    | setNextPageActionType
    | updateUsersFetchingActionType
    | updateFollowingFetchingActionType;

export const followUser = (userId: number): followUserActionType => ({type: FOLLOW, userId});
export const unfollowUser = (userId: number): unfollowUserActionType => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<usersType>): setUsersActionType => ({type: SET_USERS, users});
export const setNextPage = (): setNextPageActionType => ({type: NEXT_PAGE});
export const updateUsersFetching = (isUsersFetching: boolean): updateUsersFetchingActionType => ({
    type: UPDATE_IS_USERS_FETCHING,
    isUsersFetching
});
export const updateFollowingFetching = (isFetching: boolean, userId: number): updateFollowingFetchingActionType => ({
    type: UPDATE_IS_FOLLOWING_FETCHING,
    isFetching,
    userId
});

type thunkType = ThunkAction<Promise<void>, appStateType, any, actionsType>;

export const getUsers = (pageSize: number, currentPage: number): thunkType => {
    return async (dispatch) => {
        dispatch(updateUsersFetching(true));
        dispatch(setNextPage());

        let data = await Api.Users.getUsers(pageSize, currentPage);

        if (data === null) {
            return;
        }

        dispatch(setUsers(data.items));
        dispatch(updateUsersFetching(false));
    }
}

type processFollowUnfollowType = (userId: number) => followUserActionType | unfollowUserActionType;

const processFollowUnfollow = async (userId: number, dispatch: Dispatch<actionsType>, apiMethod: any, actionCreator: processFollowUnfollowType) => {
    dispatch(updateFollowingFetching(true, userId));
    let isSuccessful = await apiMethod(userId);

    if (isSuccessful) {
        dispatch(actionCreator(userId));
    }

    dispatch(updateFollowingFetching(false, userId));
}

export const follow = (userId: number): thunkType => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.follow, followUser);
    }
}

export const unfollow = (userId: number): thunkType => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.unfollow, unfollowUser);
    }
}

export default usersReducer;