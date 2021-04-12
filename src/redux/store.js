import profileReducer from "../reducers/profileReducer";
import dialogsReducer from "../reducers/dialogsReducer";

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
    dispatch: function (acton) {
        profileReducer(this._state.profilePage, acton);
        dialogsReducer(this._state.dialogsPage, acton);

        this._subscriber();
    }
}