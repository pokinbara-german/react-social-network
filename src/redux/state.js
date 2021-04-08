let state = {
    profilePage: {
        postsData: [
            {id: 1, text: 'Second post!', likes: 20},
            {id: 2, text: 'First post!', likes: 15},
        ]
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
};

export default state;