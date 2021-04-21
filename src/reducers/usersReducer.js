const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const NEXT_PAGE = 'NEXT-PAGE';
const UPDATE_IS_USERS_FETCHING = 'UPDATE-IS-USERS-FETCHING';

const initialStage = {
    users: [],
    currentPage: 0,
    pageSize: 4,
    isUsersFetching: false
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
        default:
            return state;
    }
}

export const followCreator = (userId) => ({type: FOLLOW, userId});
export const unfollowCreator = (userId) => ({type: UNFOLLOW, userId});
export const setUsersCreator = (users) => ({type: SET_USERS, users});
export const nextPageCreator = () => ({type: NEXT_PAGE});
export const updateIsUsersFetchingCreator = (isUsersFetching) => ({type: UPDATE_IS_USERS_FETCHING, isUsersFetching});

export default usersReducer;