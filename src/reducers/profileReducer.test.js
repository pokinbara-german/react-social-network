import profileReducer, {deletePost, sendPost} from "./profileReducer";

const initialState = {
    postsData: [
        {id: 2, text: 'Second post!', likes: 20},
        {id: 1, text: 'First post!', likes: 15},
    ]
};

/*************                   *************/
/*************  Add Post tests   *************/
/*************                   *************/

test('New post should be added', () => {
    let action = sendPost('test text');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData).toHaveLength(3);
});

test('New post object should be expected', () => {
    let expectedPost = {id: 5, text: 'test text', likes: 0}
    let action = sendPost('test text');
    let newState = profileReducer(initialState, action);

    expect(newState.postsData[2]).toMatchObject(expectedPost);
});

/*************                   *************/
/************* Delete Post tests *************/
/*************                   *************/

test('Deleting should delete some message', () => {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.postsData).toHaveLength(1);
});

test('Deleting should delete right message', () => {
    let messageForDelete = initialState.postsData[1];
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);

    let expected = expect.not.arrayContaining([messageForDelete]);
    expect(newState.postsData).toEqual(expected);
});

test('Delete should delete only existed posts', () => {
    let action = deletePost(10);
    let newState = profileReducer(initialState, action);

    expect(newState.postsData).toHaveLength(2);
});