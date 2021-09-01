/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import userMale from "../../../../assets/images/user-male.png";
import {stringOrNull} from '../../../../types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {LikesBlock} from './LikesBlock';

type postPropsType = {
    postId: string,
    message: string,
    likeCount: number,
    avatar: stringOrNull,
    userName: stringOrNull
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        <>
            <Typography>{props.message}</Typography>
            <LikesBlock postId={props.postId} likeCount={props.likeCount} key={props.postId}/>
        </>
    ];

    return(
        <Card variant={'outlined'} className={classes.postWrapper}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="ava" src={avatarSmall} />
                </ListItemAvatar>
                <ListItemText className={classes.text} primary={props.userName} secondary={actions}>
                </ListItemText>
            </ListItem>
        </Card>
    );
};

export default Post;