/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {maxLengthCreator, required} from "../../../utils/validators";

let maxLength20 = maxLengthCreator(20);

const MyPosts = (props) => {
    let posts = props.postsData.map( (post, postIndex) => <Post key={"MyPost" +postIndex} message={post.text} likeCount={post.likes}/>);

    const addPost = (formData) => {
        props.sendPost(formData.newPost);
    }

    return (
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <AddPostReduxForm onSubmit={addPost}/>
            <div className={styles.posts}>
                {posts}
            </div>
        </div>
    );
};

const AddPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPost'
                       component={TextArea}
                       placeholder='enter message'
                       validate={[required, maxLength20]}
                />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

const AddPostReduxForm = reduxForm({form: 'addPost'})(AddPostForm);

export default MyPosts;