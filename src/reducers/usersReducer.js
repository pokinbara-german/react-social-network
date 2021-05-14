import {Api} from "../components/API/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const NEXT_PAGE = 'NEXT-PAGE';
const UPDATE_IS_USERS_FETCHING = 'UPDATE-IS-USERS-FETCHING';
const UPDATE_IS_FOLLOWING_FETCHING = 'UPDATE-IS-FOLLOWING-FETCHING';

const initialStage = {
    users: [],
    currentPage: 0,
    pageSize: 10,
    isUsersFetching: false,
    followingInProgress: []
};

function mapUserFollowingStatus(userObject, userId, status) {
        if (userObject.id === userId) {
            return {...userObject, followed: status}
        }
        return userObject;
}

const usersReducer = (state = initialStage, action) => {
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
                        : [state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }
}

export const followUser = (userId) => ({type: FOLLOW, userId});
export const unfollowUser = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setNextPage = () => ({type: NEXT_PAGE});
export const updateUsersFetching = (isUsersFetching) => ({type: UPDATE_IS_USERS_FETCHING, isUsersFetching});
export const updateFollowingFetching = (isFetching, userId) => ({
    type: UPDATE_IS_FOLLOWING_FETCHING,
    isFetching,
    userId
});

export const getUsers = (pageSize, currentPage) => {
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

const processFollowUnfollow = async (userId, dispatch, apiMethod, actionCreator) => {
    dispatch(updateFollowingFetching(true, userId));
    let isSuccessful = await apiMethod(userId);

    if (isSuccessful) {
        dispatch(actionCreator(userId));
    }

    dispatch(updateFollowingFetching(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.follow, followUser);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        await processFollowUnfollow(userId, dispatch, Api.Users.unfollow, unfollowUser);
    }
}

export default usersReducer;