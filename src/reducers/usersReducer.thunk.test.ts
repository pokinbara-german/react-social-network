import {follow, getUsers, unfollow, userActions} from './usersReducer';
import {Api} from '../API/api';

const emptyFilter = {searchTerm: null, friend: null};
const getStateValue = {
    usersPage: {
        filter: emptyFilter,
        currentPage: 0,
        pageSize: 12
    }
};

jest.mock('../API/api');
let apiUsersFollowMock = Api.Users.follow as jest.Mock;
let apiUsersUnfollowMock = Api.Users.unfollow as jest.Mock;
let apiUsersGetUsersMock = Api.Users.getUsers as jest.Mock;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

function expectFollowUnfollowFail(dispatchMock: typeof jest.fn) {
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.updateFollowingFetching(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.updateFollowingFetching(false, 1));
}

/*************                   *************/
/*************   Follow tests    *************/
/*************                   *************/

test('Follow process should be successes', async () => {
    const thunk = follow(1);

    apiUsersFollowMock.mockReturnValue(Promise.resolve(true));

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.updateFollowingFetching(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.followUser(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.updateFollowingFetching(false, 1));
});

test('Follow process should be failed', async () => {
    const thunk = follow(1);

    apiUsersFollowMock.mockReturnValue(Promise.resolve(false));

    await thunk(dispatchMock, getStateMock, {});

    expectFollowUnfollowFail(dispatchMock);
});

/*************                   *************/
/*************  Unfollow tests   *************/
/*************                   *************/

test('Unfollow process should be successes', async () => {
    const thunk = unfollow(1);

    apiUsersUnfollowMock.mockReturnValue(Promise.resolve(true));

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.updateFollowingFetching(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.unfollowUser(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.updateFollowingFetching(false, 1));
});

test('Unfollow process should be failed', async () => {
    const thunk = unfollow(1);

    apiUsersUnfollowMock.mockReturnValue(Promise.resolve(false));

    await thunk(dispatchMock, getStateMock, {});

    expectFollowUnfollowFail(dispatchMock);
});

/*************                   *************/
/*************  Users get tests  *************/
/*************                   *************/

test('Users get process should be successes', async () => {
    const thunk = getUsers(emptyFilter);

    let result = {
        items: [
            {name: "Artov", id: 1, followed: false, status:	null, photos: {small: null, large: null}, uniqueUrlName: null},
            {name: "Igrek", id: 2, followed: true, status:	'status 1', photos: {small: null, large: null}, uniqueUrlName: null},
            {name: "Rogi", id: 3, followed: true, status:	'status 2', photos: {small: null, large: null}, uniqueUrlName: null},
            {name: "ssj4vegeta", id: 4, followed: false, status:	null, photos: {small: null, large: null}, uniqueUrlName: null},
        ],
        totalCount: 500,
        error: null
    }

    apiUsersGetUsersMock.mockReturnValue(result);
    getStateMock.mockReturnValue(getStateValue);

    await thunk(dispatchMock, getStateMock, {});
    getStateMock.mockReset();

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.updateUsersFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.updateUsersFetching(false));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.usersListReceived(result.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, userActions.countUsersChanged(result.totalCount));
});

test('Users get process should be failed', async () => {
    const thunk = getUsers(emptyFilter);

    apiUsersGetUsersMock.mockReturnValue(null);
    getStateMock.mockReturnValue(getStateValue);

    await thunk(dispatchMock, getStateMock, {});
    getStateMock.mockReset();

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.updateUsersFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.updateUsersFetching(false));
});