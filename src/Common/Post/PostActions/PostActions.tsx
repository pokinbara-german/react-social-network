import React from 'react';
import styles from './PostActions.module.css'
import Typography from '@material-ui/core/Typography';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import {LikesBlock} from '../LikesBlock/LikesBlock';

export const PostActions = {
    onlyText(text: string) {
        return <Typography component='span'>{text}</Typography>;
    },
    textWithOk(text: string) {
        return (
            <div className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <CheckOutlinedIcon style={{fontSize: '0.9rem'}} color='primary' className={styles.icon}/>
            </div>
        );
    },
    textWithWait(text: string) {
        return (
            <div className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <ScheduleOutlinedIcon style={{fontSize: '0.9rem'}} color='disabled' className={styles.icon}/>
            </div>
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