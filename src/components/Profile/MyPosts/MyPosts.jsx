/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    let postsData = [
        {id: 1, text: 'Second post!', likes: 20},
        {id: 2, text: 'First post!', likes: 15},
    ];

    let posts = postsData.map( post => <Post message={post.text} likeCount={post.likes}/>);

    return(
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <div>
                <div>
                    <textarea/>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {posts}
            </div>
        </div>);
};

export default MyPosts;