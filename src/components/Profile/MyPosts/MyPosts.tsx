import React from 'react';
import Post from '../../Common/Post/Post';
import List from '@material-ui/core/List';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AddMessageForm} from '../../Common/AddMessageForm/AddMessageForm';
import {profileActions} from '../../../reducers/profileReducer';
import Typography from '@material-ui/core/Typography';
import {PostActions} from '../../Common/Post/PostActions/PostActions';
import {useSelector} from 'react-redux';
import {getLoginSelector, getOwnerPhotosSelector, getPostsSelector} from '../../../selectors/selectors';

export type myPostsPropsType = {
    blockWidth: string
}

/**
 * Component with title, form and list of posts.
 * @param {myPostsPropsType} props - props object
 * @constructor
 */
const MyPosts: React.FC<myPostsPropsType> = (props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            postsList: {
                width: '100%',
                maxWidth: props.blockWidth,
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

    const postsData = useSelector(getPostsSelector);
    const userName = useSelector(getLoginSelector);
    const ownerPhotos = useSelector(getOwnerPhotosSelector);
    const avatar = ownerPhotos ? ownerPhotos.small : null;
    const classes = useStyles();

    let posts = postsData.map( (post) =>
        <Post key={'MyPost' +post.id}
              postId={post.id}
              action={PostActions.textWithLikes(post.text, post.id, post.likes)}
              avatar={avatar}
              userName={userName}
              blockWidth={props.blockWidth}
        />
    );

    return (
        <div className={classes.postBlock}>
            <Typography variant='h5' className={classes.postsTitle}>Posts</Typography>
            <AddMessageForm blockWidth={props.blockWidth}
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