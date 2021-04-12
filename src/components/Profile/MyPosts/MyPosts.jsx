/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostCreator, updateNewPostCreator} from "../../../reducers/profileReducer";

const MyPosts = (props) => {
    let posts = props.postsData.map( (post, postIndex) => <Post key={"MyPost" +postIndex} message={post.text} likeCount={post.likes}/>);

    let AddNewPost = () => {
        props.dispatch(addPostCreator());
    };

    let onNewPostChange = (event) => {
        let message = event.target.value;
        props.dispatch(updateNewPostCreator(message));
    }

    return (
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <div>
                <div>
                    <textarea onChange={onNewPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={AddNewPost}>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {posts}
            </div>
        </div>
    );
};

export default MyPosts;