/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import userMale from "../../../assets/images/user-male.png";
import {stringOrNull} from '../../../types';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import {getRouteNameById, routes} from '../../../utils/routes';
import {getFontsWithEmoji} from '../../../utils/fontHelpers';

type postPropsType = {
    postId: string,
    action?: React.ReactElement,
    avatar: stringOrNull,
    userName: stringOrNull,
    userId?: number,
    blockWidth?: string,
    rightSided?: boolean,
    primaryLink?: boolean,
}

/**
 * Unified post block with avatar, title, text and optional likes-block.
 * @param {postPropsType} props - props object
 * @param {string} props.postId - post ID as string
 * @param {React.ReactElement=} props.action - post text
 * @param {string|null} props.avatar - link to avatar image
 * @param {string|null} props.userName - text for title
 * @param {number=} props.userId - if exist, will append to avatar navlink
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
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                '& > p > span': {
                    fontFamily: getFontsWithEmoji(theme)
                },
            }
        }),
    );

    const classes = useStyles();
    let avatarSmall = props.avatar || userMale;

    const secondary = [
        <React.Fragment key={props.postId}>
            {props.action}
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
                              secondary={secondary}
                />
            </Card>
        </ListItem>
    );
};

export default Post;