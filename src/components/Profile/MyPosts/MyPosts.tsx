/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from '../../../Common/Post/Post';
import {postsDataType, stringOrNull} from '../../../types';
import List from '@material-ui/core/List';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AddMessageForm} from '../../../Common/AddMessageForm/AddMessageForm';
import {profileActions} from '../../../reducers/profileReducer';

export type myPostsPropsType = {
    postsData: Array<postsDataType>,
    avatar: stringOrNull,
    userName: stringOrNull
}

/**
 * @const
 * @type string
 * @description block max width.
 */
const maxWidth = '40ch';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        postsList: {
            width: '100%',
            maxWidth: maxWidth,
            backgroundColor: theme.palette.background.paper,
        }
    })
);

/**
 * Component with title, form and list of posts.
 * @param {myPostsPropsType} props
 * @constructor
 */
const MyPosts: React.FC<myPostsPropsType> = (props) => {
    const classes = useStyles();

    let posts = props.postsData.map( (post) =>
        <Post key={'MyPost' +post.id}
              postId={post.id}
              message={post.text}
              likeCount={post.likes}
              avatar={props.avatar}
              userName={props.userName}
              blockWidth={maxWidth}
        />
    );

    return (
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <AddMessageForm blockWidth={maxWidth}
                            sendMessage={profileActions.sendPost}
                            buttonText='Add Post'
                            minTextLength={2}
                            maxTextLength={50}
            />
            <List className={classes.postsList}>
                {posts}
            </List>
        </div>
    );
};

export default MyPosts;