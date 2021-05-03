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
    pageSize: 4,
    isUsersFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialStage, action) => {
    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    user => {
                        if (user.id === action.userId) {
                            return {...user, followed: true}
                        }
                        return user;
                    }
                )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(
                    user => {
                        if (user.id === action.userId) {
                            return {...user, followed: false}
                        }
                        return user;
                    }
                )
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        case NEXT_PAGE:
            return {...state, currentPage: ++state.currentPage}
        case UPDATE_IS_USERS_FETCHING:
            return {...state, isUsersFetching: action.isUsersFetching}
        case UPDATE_IS_FOLLOWING_FETCHING:
            return {...state,
                followingInProgress:
                    action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter( id => id !== action.userId)]
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
export const updateFollowingFetching = (isFetching, userId) => ({type: UPDATE_IS_FOLLOWING_FETCHING, isFetching, userId});

export const getUsers = (pageSize, currentPage) => {
    return (dispatch) => {
        dispatch(updateUsersFetching(true));
        dispatch(setNextPage());

        Api.Users.getUsers(pageSize, currentPage).then(data => {
            if (data === null) {
                return;
            }

            dispatch(setUsers(data.items));
            dispatch(updateUsersFetching(false));
        });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(updateFollowingFetching(true, userId));
        Api.Users.follow(userId).then(isSuccessful => {
            if (isSuccessful) {
                dispatch(followUser(userId));
            }
            dispatch(updateFollowingFetching(false, userId));
        });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(updateFollowingFetching(true, userId));
        Api.Users.unfollow(userId).then(isSuccessful => {
            if (isSuccessful) {
                dispatch(unfollowUser(userId));
            }
            dispatch(updateFollowingFetching(false, userId));
        });
    }
}

export default usersReducer;