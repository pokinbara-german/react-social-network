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
import {LikesBlock} from './LikesBlock/LikesBlock';
import {NavLink} from 'react-router-dom';
import {getRouteNameById, routes} from '../Routes';

type postPropsType = {
    postId: string,
    message: string,
    likeCount?: number,
    avatar: stringOrNull,
    userName: stringOrNull,
    userId?: number,
    withoutLikes?: boolean,
    blockWidth?: string,
    rightSided?: boolean,
    primaryLink?: boolean,
}

/**
 * Unified post block with avatar, title, text and optional likes-block.
 * @param {postPropsType} props - props object
 * @param {string} props.postId - post ID as string
 * @param {string} props.message - post text
 * @param {number=} props.likeCount - count of likes of post
 * @param {string|null} props.avatar - link to avatar image
 * @param {string|null} props.userName - text for title
 * @param {number=} props.userId - if exist, will append to avatar navlink
 * @param {boolean=} props.withoutLikes - if true, block will return without likes-block
 * @param {string=} props.blockWidth - sets max-width of block (CSS value, i.e. "5px")
 * @param {boolean=} props.primaryLink - if true, title text will anchor
 * @constructor
 */
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

    const primaryLinked = <NavLink to={`/${getRouteNameById(routes.dialogs.id)}/${props.userId}`}>
                              {props.userName}
                          </NavLink>;

    return(
        <ListItem alignItems='flex-start' className={classes.postsItem}>
            <Card variant={'outlined'} className={classes.postWrapper}>
                <ListItemAvatar>
                    {!!props.userId
                        ? <NavLink to={`/${getRouteNameById(routes.profile.id)}/${props.userId}`}>
                            <Avatar alt='ava' src={avatarSmall} />
                          </NavLink>
                        : <Avatar alt='ava' src={avatarSmall} />
                    }
                </ListItemAvatar>
                <ListItemText className={classes.text}
                              primary={!!props.primaryLink ? primaryLinked : props.userName}
                              secondary={actions}
                />
            </Card>
        </ListItem>
    );
};

export default Post;