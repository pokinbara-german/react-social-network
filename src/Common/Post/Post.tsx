/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import userMale from "../../assets/images/user-male.png";
import {stringOrNull} from '../../types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {LikesBlock} from '../../components/Profile/MyPosts/LikesBlock/LikesBlock';

type postPropsType = {
    postId: string,
    message: string,
    likeCount?: number,
    avatar: stringOrNull,
    userName: stringOrNull,
    withoutLikes?: boolean,
    blockWidth?: string,
    rightSided?: boolean
}



const Post: React.FC<postPropsType> = (props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            postsItem: {
                padding: 0,
                justifyContent: props.rightSided ? 'end' : 'start'
            },
            postWrapper: {
                display: 'flex',
                margin: theme.spacing(1),
                width: props.blockWidth || 'max-content',
                padding: theme.spacing(1, 2)
            },
            text: {
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
            }
        }),
    );

    const classes = useStyles();
    let avatarSmall = props.avatar || userMale;

    const actions = [
        <React.Fragment key={props.postId}>
            <Typography component='span'>{props.message}</Typography>
            {props.withoutLikes || <LikesBlock postId={props.postId} likeCount={props.likeCount || 0}/>}
        </React.Fragment>
    ];

    return(
        <ListItem alignItems='flex-start' className={classes.postsItem}>
            <Card variant={'outlined'} className={classes.postWrapper}>
                <ListItemAvatar>
                    <Avatar alt='ava' src={avatarSmall} />
                </ListItemAvatar>
                <ListItemText className={classes.text} primary={props.userName} secondary={actions}>
                </ListItemText>
            </Card>
        </ListItem>
    );
};

export default Post;