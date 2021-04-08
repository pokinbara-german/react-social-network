/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let posts = props.postsData.map(post => <Post message={post.text} likeCount={post.likes}/>);

    let NewPostArea = React.createRef();

    let AddNewPost = () => {
        alert(NewPostArea.current.value);
    };

    return (
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <div>
                <div>
                    <textarea ref={NewPostArea}/>
                </div>
                <div>
                    <button onClick={AddNewPost}>Add Post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {posts}
            </div>
        </div>);
};

export default MyPosts;