import usersReducer, {initialStateType, userActions} from './usersReducer';

let initialState: initialStateType;

beforeEach(() => {
    initialState = {
        users: [
            {name: "Artov", id: 1, followed: false, status:	null, photos: {small: null, large: null}, uniqueUrlName: null},
            {name: "Igrek", id: 2, followed: true, status:	'status 1', photos: {small: null, large: null}, uniqueUrlName: null},
            {name: "Rogi", id: 3, followed: true, status:	'status 2', photos: {small: null, large: null}, uniqueUrlName: null},
            {name: "ssj4vegeta", id: 4, followed: false, status:	null, photos: {small: null, large: null}, uniqueUrlName: null},
        ],
        currentPage: 0,
        pageSize: 10,
        isHasMore: false,
        isUsersFetching: false,
        followingInProgress: [],
        filter: {
            searchTerm: null,
            friend: null
        }
    };
});

/*************                   *************/
/*************   Follow tests    *************/
/*************                   *************/

test('Following make follow to right user', () => {
    const newState = usersReducer(initialState, userActions.followUser(1));

    expect(newState.users[3].followed).toBeFalsy();
});

test('Following make follow flag', () => {
    const newState = usersReducer(initialState, userActions.followUser(1));

    expect(newState.users[0].followed).toBeTruthy();
});

/*************                   *************/
/*************  Unfollow tests   *************/
/*************                   *************/

test('Unfollowing make unfollow to right user', () => {
    const newState = usersReducer(initialState, userActions.unfollowUser(2));

    expect(newState.users[2].followed).toBeTruthy();
});

test('Unfollowing make unfollow flag', () => {
    const newState = usersReducer(initialState, userActions.unfollowUser(2));

    expect(newState.users[1].followed).toBeFalsy();
});