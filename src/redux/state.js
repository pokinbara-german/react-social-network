export let store= {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, text: 'Second post!', likes: 20},
                {id: 2, text: 'First post!', likes: 15},
            ],
            newPostText: 'dasfasfasf'
        },
        dialogsPage: {
            userList: [
                {id:1, name: 'Andrey'},
                {id:2, name: 'Sergey'},
                {id:3, name: 'Misha'}
            ],
            messageList: [
                {id: 1, text: 'First!', userId: 1},
                {id: 2, text: 'Second!', userId: 2},
                {id: 3, text: 'Third!', userId: 1},
            ]
        }
    },
    _subscriber: function() {
        console.log('No default observer!');
    },
    getState: function () {
        return this._state;
    },
    subscribe: function (observer) {
        this._subscriber = observer;
    },
    addMessage: function (text) {
        if (this._state === undefined) {
            console.log('No right context. See strict mode');
            return;
        }

        if (text === '' || text === undefined) {
            return;
        }

        this._state.dialogsPage.messageList.push({id: 4, text: text, userId: 1});
        this._subscriber();
    },
    addPost: function (text) {
        if (this._state === undefined) {
            console.log('No right context. See strict mode');
            return;
        }

        this._state.profilePage.postsData.push({id: 5, text: text, likes: 0});
        this._state.profilePage.newPostText = '';
        this._subscriber();
    },
    updateNewPostText: function (text) {
        if (this._state === undefined) {
            console.log('No right context. See strict mode');
            return;
        }

        this._state.profilePage.newPostText = text;
        this._subscriber();
    }
}