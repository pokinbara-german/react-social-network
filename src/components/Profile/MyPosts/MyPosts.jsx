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
        <div>
            Posts
            <div>
                <textarea></textarea>
                <button>Add Post</button>
            </div>
            <Post message="Second post!" likeCount="20"/>
            <Post message="First post!" likeCount="15"/>
        </div>);
};

export default MyPosts;