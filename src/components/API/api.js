import axios from "axios";

const defaultApi = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '4b793204-e0f1-45c5-b96a-007d58f175b3'}
});

export const Api = {
    Users: {
        getUsers: (pageSize = 4, currentPage = 0) => {
            return defaultApi.get('users',
                {params: {count: pageSize, page: currentPage + 1}}
            ).then(response => {
                if (response.data.items.length === 0) {
                    return null;
                }

                return response.data;
            });
        },
        unfollow: (userId) => {
            return defaultApi.delete(
                'follow/' + userId
            )
                .then( response => {
                    return response.data.resultCode === 0;
                });
        },
        follow: (userId) => {
            return defaultApi.post(
                'follow/' + userId
            )
                .then( response => {
                    return response.data.resultCode === 0;
                });
        }
    },
    Auth: {
        Me: () => {
            return defaultApi.get('auth/me/').then(response => {
                if (response.data.resultCode === 0) {
                    return response.data.data;
                }

                return null;
            });
        },
        Login: (email, password, rememberMe) => {
            return defaultApi.post('auth/login/', {email, password, rememberMe}).then(response => {
                if (response.data.resultCode === 0) {
                    return {result: response.data.data};
                } else if (response.data.resultCode === 1 || response.data.resultCode === 10) {
                    let message = response.data.messages.length ? response.data.messages[0] : 'Unknown error';

                    return {error: message};
                }

                return null;
            });
        },
        Logout: () => {
            return defaultApi.delete('auth/login/').then(response => {
                return response.data.resultCode === 0;
            });
        }
    },
    Profile: {
        getProfile: (userId) => {
            return defaultApi.get('profile/' + userId)
                .then( response => {
                    if (response.data.length === 0) {
                        return null;
                    }

                    return response.data;
                });
        },
        getStatus: (userId) => {
            return defaultApi.get('profile/status/' + userId)
                .then( response => {
                    return response.data;
                });
        },
        updateStatus: (status) => {
            return defaultApi.put('profile/status', {status})
                .then( response => {
                    return response.data.resultCode === 0;
                });
        },
        savePhoto: (file) => {
            const formData = new FormData();
            formData.append('image', file);

            return defaultApi.put('profile/photo', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
                .then( response => {
                    if (response.data.resultCode === 0) {
                        return response.data.data.photos;
                    }
                });
        },
        saveProfile: (profile) => {
            return defaultApi.put('profile', profile)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        return true;
                    } else {
                        let message = response.data.messages.length ? response.data.messages : 'Unknown error';

                        return {error: message};
                    }
                });
        }
    }
}