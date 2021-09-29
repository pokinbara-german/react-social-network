import profileReducer, {initialStateType, profileActions} from "./profileReducer";

const initialState: initialStateType = {
    postsData: [
        {id: 'firstMessage', text: 'First post!', likes: 15},
        {id: 'secondMessage', text: 'Second post!', likes: 20},
    ],
    profile: {
        aboutMe: "Spb",
        contacts: {
            facebook: "https://www.facebook.com/shadowmaster.sm",
            website: "","vk":"https://vk.com/shadowmaster",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "https://github.com/pokinbara-german",
            mainLink: ""
        },
        lookingForAJob: true,
        lookingForAJobDescription: "PHP, React, Redux, JS, JQuery, MySQL, MongoDB",
        fullName: "User1",
        userId: 16701,
        photos: {
            small: "https://social-network.samuraijs.com/activecontent/images/users/16702/user-small.jpg?v=18",
            large: "https://social-network.samuraijs.com/activecontent/images/users/16702/user.jpg?v=18"
        }
    },
    ownerProfile: {
        aboutMe: "Spb",
        contacts: {
            facebook: "https://www.facebook.com/shadowmaster.sm",
            website: "","vk":"https://vk.com/shadowmaster",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "https://github.com/pokinbara-german",
            mainLink: ""
        },
        lookingForAJob: true,
        lookingForAJobDescription: "PHP, React, Redux, JS, JQuery, MySQL, MongoDB",
        fullName: "User",
        userId: 16702,
        photos: {
            small: "https://social-network.samuraijs.com/activecontent/images/users/16702/user-small.jpg?v=18",
            large: "https://social-network.samuraijs.com/activecontent/images/users/16702/user.jpg?v=18"
        }
    },
    statusFetching: true,
    status: 'Some Text'
};

const newProfile = {
    aboutMe: "Spb1",
    contacts: {
        facebook: "some link",
        website: "","vk":"https://vk.com/shadowmaster",
        twitter: "",
        instagram: "",
        youtube: "",
        github: "https://github.com/pokinbara-german",
        mainLink: ""
    },
    lookingForAJob: true,
    lookingForAJobDescription: "PHP, React, Redux, JS, JQuery, MySQL, MongoDB",
    fullName: "User3",
    userId: 16701,
    photos: {
        small: "https://social-network.samuraijs.com/activecontent/images/users/16702/user-small.jpg?v=18",
        large: "https://social-network.samuraijs.com/activecontent/images/users/16702/user.jpg?v=18"
    }
};

/*************                   *************/
/*************  Send Post tests  *************/
/*************                   *************/

test('New post should be added', () => {
    let action = profileActions.sendPost('test text');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData).toHaveLength(3);
});

test('New post object should be expected', () => {
    let expectedPost = {text: 'test text', likes: 0}
    let action = profileActions.sendPost('test text');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData[2]).toEqual(
        expect.objectContaining(expectedPost)
    );
});

/*************                   *************/
/************* Delete Post tests *************/
/*************                   *************/

test('Deleting should delete some message', () => {
    let action = profileActions.deletePost('firstMessage');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData).toHaveLength(1);
});

test('Deleting should delete right message', () => {
    let messageForDelete = initialState.postsData[0];
    let action = profileActions.deletePost('firstMessage');
    let newState = profileReducer(initialState, action);

    let expected = expect.not.arrayContaining([messageForDelete]);
    expect(newState.postsData).toEqual(expected);
});

test('Delete should delete only existed posts', () => {
    let action = profileActions.deletePost('thirdMessage');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData).toHaveLength(2);
});

/*************                   *************/
/************* Set profile tests *************/
/*************                   *************/

test('Set profile should change profile', () => {
    let action = profileActions.setProfile(newProfile);
    let newState = profileReducer(initialState, action);

    expect(newState.profile).toEqual(newProfile);
    expect(newState.profile).not.toEqual(initialState.profile);
});

test('Set profile should change only profile', () => {
    let action = profileActions.setProfile(newProfile);
    let newState = profileReducer(initialState, action);

    expect(newState.ownerProfile).toEqual(initialState.ownerProfile);
    expect(newState).toHaveProperty('statusFetching', initialState.statusFetching);
    expect(newState).toHaveProperty('status', initialState.status);
    expect(newState.postsData).toEqual(initialState.postsData);
});

/*************                   *************/
/********** Set ownerProfile tests ***********/
/*************                   *************/

test('Set ownerProfile should change owner profile', () => {
    let action = profileActions.setOwnersProfile(newProfile);
    let newState = profileReducer(initialState, action);

    expect(newState.ownerProfile).toEqual(newProfile);
    expect(newState.ownerProfile).not.toEqual(initialState.ownerProfile);
});

test('Set ownerProfile should change only owner profile', () => {
    let action = profileActions.setOwnersProfile(newProfile);
    let newState = profileReducer(initialState, action);

    expect(newState.profile).toEqual(initialState.profile);
    expect(newState).toHaveProperty('statusFetching', initialState.statusFetching);
    expect(newState).toHaveProperty('status', initialState.status);
    expect(newState.postsData).toEqual(initialState.postsData);
});

/*************                   *************/
/*********** Update profile tests ************/
/*************                   *************/

test('Update profile should change profile and contacts', () => {
    let action = profileActions.updateProfile(newProfile);
    let newState = profileReducer(initialState, action);

    expect(newState.profile).toEqual(newProfile);
    expect(newState.profile).not.toEqual(initialState.profile);
    expect(newState.profile?.contacts).toEqual(newProfile.contacts);
    expect(newState.profile?.contacts).not.toEqual(initialState.profile?.contacts);
});

/*************                   *************/
/************* Set status tests  *************/
/*************                   *************/

test('Set status should change status', () => {
    const newStatus = 'New status!'
    let action = profileActions.setStatus(newStatus);
    let newState = profileReducer(initialState, action);

    expect(newState.status).toEqual(newStatus);
});

test('Set status should change only status field', () => {
    const newStatus = 'New status!'
    let action = profileActions.setStatus(newStatus);
    let newState = profileReducer(initialState, action);

    expect(newState).toHaveProperty('statusFetching', initialState.statusFetching);
    expect(newState.postsData).toEqual(initialState.postsData);
    expect(newState.profile).toEqual(initialState.profile);
    expect(newState.ownerProfile).toEqual(initialState.ownerProfile);
});

/*************                   *************/
/*************Toggle status tests*************/
/*************                   *************/

test('Toggle status should change field', () => {
    let fieldSnapshot = initialState.statusFetching;
    let action = profileActions.toggleStatusFetching();
    let newState = profileReducer(initialState, action);

    expect(newState.statusFetching).toEqual(!fieldSnapshot);
});

test('Toggle status should change only right field', () => {
    let action = profileActions.toggleStatusFetching();
    let newState = profileReducer(initialState, action);

    expect(newState).toHaveProperty('status', initialState.status);
    expect(newState.postsData).toEqual(initialState.postsData);
    expect(newState.profile).toEqual(initialState.profile);
    expect(newState.ownerProfile).toEqual(initialState.ownerProfile);
});

/*************                   *************/
/************* Set photo tests  *************/
/*************                   *************/

test('Set photo should change photos', () => {
    const newPhotos = {
        small: 'link/to/photo1',
        large: 'link/to/photo2'
    }

    let action = profileActions.savePhotoSuccess(newPhotos);
    let newState = profileReducer(initialState, action);

    expect(newState.profile?.photos).toEqual(newPhotos);
    expect(newState.ownerProfile?.photos).toEqual(newPhotos);
    expect(newState.profile?.photos).not.toEqual(initialState.profile?.photos);
    expect(newState.ownerProfile?.photos).not.toEqual(initialState.ownerProfile?.photos);
});

test('Set photo should change only photos', () => {
    const newPhotos = {
        small: 'link/to/photo1',
        large: 'link/to/photo2'
    }

    let action = profileActions.savePhotoSuccess(newPhotos);
    let newState = profileReducer(initialState, action);

    expect(newState).toHaveProperty('statusFetching', initialState.statusFetching);
    expect(newState).toHaveProperty('status', initialState.status);
    expect(newState.postsData).toEqual(initialState.postsData);
    expect(newState.profile).not.toEqual(initialState.profile);
    expect(newState.ownerProfile).not.toEqual(initialState.ownerProfile);
});

/*************                   *************/
/*************  Add like tests   *************/
/*************                   *************/

test('Add like should add like', () => {
    let action = profileActions.addLike('firstMessage');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData[0].likes).toEqual(initialState.postsData[0].likes + 1);
    expect(newState.postsData[0]).not.toEqual(initialState.postsData[0]);
});

test('Add like should add only for right post', () => {
    let action = profileActions.addLike('firstMessage');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData[1]).toEqual(initialState.postsData[1]);
    expect(newState.postsData[1].likes).toEqual(initialState.postsData[1].likes);
});

/*************                   *************/
/************* Logged out tests  *************/
/*************                   *************/

test('On logged out profile-fields should be cleared', () => {
    let action = profileActions.loggedOut();
    let newState = profileReducer(initialState, action);

    expect(newState.profile).toBeNull();
    expect(newState.ownerProfile).toBeNull();
});

test('On logged out only necessary fields should be cleared', () => {
    let action = profileActions.loggedOut();
    let newState = profileReducer(initialState, action);

    expect(newState).toHaveProperty('statusFetching', initialState.statusFetching);
    expect(newState).toHaveProperty('status', initialState.status);
    expect(newState.postsData).toEqual(initialState.postsData);
});