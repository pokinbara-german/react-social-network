/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, TextArea} from "../../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {maxLengthCreator, required} from "../../../utils/validators";
import {postsDataType, stringOrNull} from '../../../reducers/types/types';

export type mapStatePropsType = {
    postsData: Array<postsDataType>,
    avatar: stringOrNull
}

export type mapDispatchPropsType = {
    sendPost: (newPost: string) => void
}

type ownPropsType = {
};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

type formDataType = {
    newPost: string
}

type fieldNamesType = keyof formDataType

let maxLength20 = maxLengthCreator(20);

const MyPosts: React.FC<propsType> = (props) => {
    let posts = props.postsData.map( (post, postIndex) =>
        <Post key={"MyPost" +postIndex} postId={post.id} message={post.text} likeCount={post.likes}  avatar={props.avatar}/>
    );

    const addPost = (formData: formDataType) => {
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

const AddPostForm: React.FC<InjectedFormProps<formDataType>> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<fieldNamesType>(
                    undefined,
                    'Введите сообщение',
                    'newPost',
                    TextArea,
                    [required, maxLength20]
                )}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
}

const AddPostReduxForm = reduxForm<formDataType>({form: 'addPost'})(AddPostForm);

export default MyPosts;