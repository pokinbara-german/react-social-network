import React from 'react';
import styles from './PostActions.module.css'
import Typography from '@material-ui/core/Typography';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import {LikesBlock} from '../LikesBlock/LikesBlock';

/**
 * @const
 * @description - value of css font-size for icons.
 */
const FONT_SIZE = '0.9rem';

export const PostActions = {
    onlyText(text: string) {
        return <Typography component='span'>{text}</Typography>;
    },
    textWithOk(text: string) {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <CheckOutlinedIcon style={{fontSize: FONT_SIZE}} color='primary' className={styles.icon}/>
            </span>
        );
    },
    textWithWait(text: string) {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <ScheduleOutlinedIcon style={{fontSize: FONT_SIZE}} color='disabled' className={styles.icon}/>
            </span>
        );
    },
    textWithLikes(text: string, postId: string, likes: number) {
        return (
            <>
                <Typography component='span'>{text}</Typography>
                <LikesBlock postId={postId} likeCount={likes}/>
            </>
        );
    }
}