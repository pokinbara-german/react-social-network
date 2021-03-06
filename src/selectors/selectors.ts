import {appStateType} from '../redux/reduxStore';

export function getUsersSelector (state: appStateType) {
    return state.usersPage.users;
}

export function getIsUsersFetchingSelector (state: appStateType) {
    return state.usersPage.isUsersFetching;
}

export function getFollowingInProgressSelector (state: appStateType) {
    return state.usersPage.followingInProgress;
}

export function getUsersFilterSelector (state: appStateType) {
    return state.usersPage.filter;
}

export function getUsersHasMoreSelector (state: appStateType) {
    return state.usersPage.isHasMore;
}

export function getIsAuthSelector (state: appStateType) {
    return state.auth.isAuth;
}

export function getCaptchaUrlSelector (state: appStateType) {
    return state.auth.captchaUrl;
}

export function getLoginSelector (state: appStateType) {
    return state.auth.login;
}

export function getOwnerIdSelector (state: appStateType) {
    return state.auth.id;
}

export function getChatMessages (state: appStateType) {
    return state.chat.messages;
}

export function getIsChatConnectedSelector (state: appStateType) {
    return state.chat.isConnected;
}

export function getDialogsMessagesSelector (state: appStateType) {
    return state.dialogsPage.messageList;
}

export function getDialogsUserListSelector (state: appStateType) {
    return state.dialogsPage.userList;
}

export function getNewMessagesCountSelector (state: appStateType) {
    return state.dialogsPage.newMessagesCount;
}

export function getDialogHasMoreSelector (state: appStateType) {
    return state.dialogsPage.currentDialogHasMore;
}

export function getIsDialogsFetchingSelector (state: appStateType) {
    return state.dialogsPage.isDialogsFetching;
}

export function getIsMessageSentFetchingSelector (state: appStateType) {
    return state.dialogsPage.isMessageSentFetching;
}

export function getIsMessagesFetchingSelector (state: appStateType) {
    return state.dialogsPage.isMessagesFetching;
}

export function getAppInitDoneSelector (state: appStateType) {
    return state.app.initDone;
}

export function getOwnerPhotosSelector (state: appStateType) {
    return state.profilePage.ownerProfile?.photos;
}

export function getPostsSelector (state: appStateType) {
    return state.profilePage.postsData;
}

export function getProfileSelector (state: appStateType) {
    return state.profilePage.profile;
}

export function getProfileStatusSelector (state: appStateType) {
    return state.profilePage.status;
}

export function getProfileStatusFetchingSelector (state: appStateType) {
    return state.profilePage.statusFetching;
}