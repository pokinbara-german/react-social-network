import {follow, unfollow, userActions} from './usersReducer';
import {Api} from '../components/API/api';

jest.mock('../components/API/api');
let apiUsersFollowMock = Api.Users.follow as jest.Mock;
let apiUsersUnfollowMock = Api.Users.unfollow as jest.Mock;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

function expectFail(dispatchMock: typeof jest.fn) {
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.updateFollowingFetching(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.updateFollowingFetching(false, 1));
}

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

    expectFail(dispatchMock);
});

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

    expectFail(dispatchMock);
});