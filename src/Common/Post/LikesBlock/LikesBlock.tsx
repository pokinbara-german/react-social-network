import React from 'react';
import {useDispatch} from 'react-redux';
import {profileActions} from '../../../reducers/profileReducer';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

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
        }
    }),
);

/**
 * Returns counter for post likes with tooltip and button to add like.
 * @param {likesBlockPropsType} props - props object
 * @param {string} props.postId - ID of post for identify it in DOM (must be unique)
 * @param {number} props.likeCount - current count of post likes
 * @constructor
 */
export const LikesBlock: React.FC<likesBlockPropsType> = (props) => {
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

    return (
        <span onClick={likeHandler} id={'post-' + props.postId} className={classes.likeWrapper}>
            <Tooltip arrow title='Like' aria-label='like'>
                {props.likeCount ? <ThumbUpIcon fontSize={iconSize}/> : <ThumbUpOutlinedIcon fontSize={iconSize}/>}
            </Tooltip>
            <span>{props.likeCount}</span>
        </span>
    );
};