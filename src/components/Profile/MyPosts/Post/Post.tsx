/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import userMale from "../../../../assets/images/user-male.png";
import {stringOrNull} from '../../../../types';
import {useDispatch} from 'react-redux';
import {profileActions} from '../../../../reducers/profileReducer';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

type postPropsType = {
    postId: string,
    message: string,
    likeCount: number,
    avatar: stringOrNull
}

type likesBlockPropsType = {
    postId: string,
    likeCount: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        likeWrapper: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        postWrapper: {
            display: 'flex',
            margin: theme.spacing(1),
        },
        text: {
            whiteSpace: 'pre-line',
            overflowWrap: 'break-word',
        }
    }),
);

const Post: React.FC<postPropsType> = (props) => {
    const classes = useStyles();
    let avatarSmall = props.avatar || userMale;

    const actions = [
        <LikesBlock postId={props.postId} likeCount={props.likeCount} key={props.postId}/>
    ];

    return(
        <Card variant={'outlined'} className={classes.postWrapper}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="ava" src={avatarSmall} />
                </ListItemAvatar>
                <ListItemText className={classes.text} primary={props.message} secondary={actions}>
                </ListItemText>
            </ListItem>
        </Card>
    );
};

/**
 * Returns counter for post likes with tooltip and button to add like.
 * @param {likesBlockPropsType} props
 * @constructor
 */
const LikesBlock: React.FC<likesBlockPropsType> = (props) => {
    const iconSize = 'small';
    const dispatch = useDispatch();
    const classes = useStyles();

    /**
     * Add like to post
     * @param {React.MouseEvent<HTMLSpanElement>} event - sets automatically, not need to put it
     */
    const likeHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        let targetId = event.currentTarget.id;
        let postId = targetId.substr(5);

        if (postId) {
            dispatch(profileActions.addLike(postId));
        }
    };

    return(
        <span onClick={likeHandler} id={'post-' + props.postId} className={classes.likeWrapper}>
            <Tooltip arrow title='Like' aria-label='like'>
                {props.likeCount ? <ThumbUpIcon fontSize={iconSize}/> : <ThumbUpOutlinedIcon fontSize={iconSize}/>}
            </Tooltip>
            <span>{props.likeCount}</span>
        </span>
    );
};

export default Post;