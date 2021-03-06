import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {appStateType} from './redux/reduxStore';

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type stringOrNull = string | null;

export type profileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: contactsType,
    photos: photosType,
    aboutMe: string
}

export type contactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}

export type photosType = {
    small: string | null,
    large: string | null
}

export type usersType = {
    id: number,
    name: string,
    status: stringOrNull,
    photos: photosType,
    followed: boolean,
    uniqueUrlName: stringOrNull
}

export interface MatchParams {
    userId: string;
}

export type arrayOfNumbers = Array<number>;

export enum resultCodesType {
    Success = 0,
    Error = 1
}

export enum captchaResultCodeType {
    captchaRequired = 10
}

export type basicResponseType = {
    data: {},
    resultCode: resultCodesType,
    messages: Array<string>
};

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>;

export type postsDataType = {
    id: string,
    text: string,
    likes: number
}

export type userListType = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    newMessagesCount: number,
    photos: photosType
}

export type messageListType = {
    id: string,
    body: string,
    addedAt: string,
    senderId: number,
    senderName: string,
    recipientId: number,
    viewed: boolean
}