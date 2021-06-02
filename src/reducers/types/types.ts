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
    status: string,
    photos: photosType,
    followed: boolean
}

export interface MatchParams {
    userId: string;
}

export type followingInProgressType = Array<number>;

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