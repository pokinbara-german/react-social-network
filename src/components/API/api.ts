import axios from "axios";
import {
    basicResponseType,
    captchaResultCodeType,
    photosType,
    profileType,
    resultCodesType, usersType
} from "../../reducers/types/types";

const defaultApi = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '4b793204-e0f1-45c5-b96a-007d58f175b3'}
});

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type meResponseType = Override<basicResponseType, {
    data: {
        id: number,
        email: string,
        login: string
    }
}>;

type loginResponseType = Override<basicResponseType, {
    data: {
        id: number
    },
    resultCode: resultCodesType | captchaResultCodeType
}>;

type updateProfileResponseType = Override<basicResponseType, {
    fieldsErrors: Array<string>
}>;

type savePhotoResponseType = Override<basicResponseType, {
    data: {
        photos: photosType,
    },
    fieldsErrors: Array<string>
}>;

type captchaResponseType = {
    url: string
}

type getUsersResponseType = {
    items: Array<usersType>,
    totalCount: number,
    error: string | null
}

export const Api = {
    Users: {
        getUsers: (pageSize = 4, currentPage = 0) => {
            return defaultApi.get<getUsersResponseType>('users',
                {params: {count: pageSize, page: currentPage + 1}}
            ).then(response => {
                if (response.data.items.length === 0) {
                    return null;
                }

                return response.data;
            });
        },
        unfollow: (userId: number) => {
            return defaultApi.delete<basicResponseType>('follow/' + userId)
                .then( response => {
                    return response.data.resultCode === resultCodesType.Success;
                });
        },
        follow: (userId: number) => {
            return defaultApi.post<basicResponseType>('follow/' + userId).then( response => {
                    return response.data.resultCode === resultCodesType.Success;
                });
        }
    },
    Auth: {
        Me: () => {
            return defaultApi.get<meResponseType>('auth/me/').then(response => {
                if (response.data.resultCode === resultCodesType.Success) {
                    return response.data.data;
                }

                return null;
            });
        },
        Login: (email: string, password: string, rememberMe: boolean, captcha: string) => {
            return defaultApi.post<loginResponseType>('auth/login/', {email, password, rememberMe, captcha}).then(response => {
                if (response.data.resultCode === resultCodesType.Success) {
                    return {result: response.data.data};
                }

                let message = response.data.messages.length ? response.data.messages[0] : 'Unknown error';
                let resultCode = response.data.resultCode || -1;

                return {error: message, resultCode: resultCode};
            });
        },
        Logout: () => {
            return defaultApi.delete<basicResponseType>('auth/login/').then(response => {
                return response.data.resultCode === resultCodesType.Success;
            });
        }
    },
    Profile: {
        getProfile: (userId: number) => {
            return defaultApi.get<profileType>('profile/' + userId)
                .then( response => {
                    if (!response.data) {
                        return null;
                    }

                    return response.data;
                });
        },
        getStatus: (userId: number) => {
            return defaultApi.get<string>('profile/status/' + userId)
                .then( response => {
                    return response.data;
                });
        },
        updateStatus: (status: string) => {
            return defaultApi.put<basicResponseType>('profile/status', {status})
                .then( response => {
                    return response.data.resultCode === resultCodesType.Success;
                });
        },
        savePhoto: (file: File) => {
            const formData = new FormData();
            formData.append('image', file);

            return defaultApi.put<savePhotoResponseType>('profile/photo', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then( response => {
                    if (response.data.resultCode === 0) {
                        return response.data.data.photos;
                    }
                });
        },
        saveProfile: (profile: profileType) => {
            return defaultApi.put<updateProfileResponseType>('profile', profile)
                .then(response => {
                    if (response.data.resultCode === resultCodesType.Success) {
                        return;
                    } else {
                        return response.data.messages.length ? response.data.messages[0] : 'Unknown error';
                    }
                });
        }
    },
    Security: {
        getCaptcha: () => {
            return defaultApi.get<captchaResponseType>('security/get-captcha-url')
                .then(response => {
                    if (!response.data) {
                        return;
                    }

                    return response.data.url;
                })
        }
    }
}