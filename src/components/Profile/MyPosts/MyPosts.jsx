/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return(
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                <Post message="Second post!" likeCount="20"/>
                <Post message="First post!" likeCount="15"/>
            </div>
        </div>);
};

export default MyPosts;