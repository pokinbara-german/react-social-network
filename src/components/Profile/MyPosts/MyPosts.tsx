/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Post from '../../Common/Post/Post';
import {postsDataType, stringOrNull} from '../../../types';
import List from '@material-ui/core/List';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AddMessageForm} from '../../Common/AddMessageForm/AddMessageForm';
import {profileActions} from '../../../reducers/profileReducer';
import Typography from '@material-ui/core/Typography';
import {PostActions} from '../../Common/Post/PostActions/PostActions';

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
const MAX_WIDTH = '30ch';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        postsList: {
            width: '100%',
            maxWidth: MAX_WIDTH,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'column-reverse'
        },
        postsTitle: {
            margin: theme.spacing(2, 0)
        },
        postBlock: {
            padding: theme.spacing(1)
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
              action={PostActions.textWithLikes(post.text, post.id, post.likes)}
              avatar={props.avatar}
              userName={props.userName}
              blockWidth={MAX_WIDTH}
        />
    );

    return (
        <div className={classes.postBlock}>
            <Typography variant='h5' className={classes.postsTitle}>Posts</Typography>
            <AddMessageForm blockWidth={MAX_WIDTH}
                            sendMessage={profileActions.sendPost}
                            buttonText='Add Post'
                            minTextLength={2}
                            maxTextLength={100}
            />
            <List className={classes.postsList}>
                {posts}
            </List>
        </div>
    );
};

export default MyPosts;