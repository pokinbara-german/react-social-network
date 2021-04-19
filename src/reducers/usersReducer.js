const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

const initialStage = {
    users: [

    ]
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
        default:
            return state;
    }
}

export const followCreator = (userId) => ({type: FOLLOW, userId: userId});
export const unfollowCreator = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsersCreator = (users) => ({type: SET_USERS, users: users});

export default usersReducer;