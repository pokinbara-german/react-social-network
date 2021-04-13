/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let posts = props.profilePage.postsData.map( (post, postIndex) => <Post key={"MyPost" +postIndex} message={post.text} likeCount={post.likes}/>);

    return (
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <div>
                <div>
                    <textarea onChange={props.updatePostMessage} value={props.profilePage.newPostText}/>
                </div>
                <div>
                    <button onClick={props.sendPost}>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {posts}
            </div>
        </div>
    );
};

export default MyPosts;