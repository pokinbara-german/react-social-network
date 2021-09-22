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

/**
 * @const
 * @description - value of css font-size for date block.
 */
const DATE_SIZE = '0.7rem';

/**
 * Return date string in human readable format.
 * @param {string} date - date as string like "2021-09-18T10:06:21.48"
 */
function getFormattedDate(date: string): string {
    const separator = 'T';

    if (!date || date.indexOf(separator) < 1) {
        return '';
    }

    let dateParts = date.split(separator);
    let datePart = dateParts[0].replace(/-/g, ' ').split(' ').reverse().join(' ');
    let timePart = dateParts[1].split('.')[0];

    return `${datePart} ${timePart}`;
}

export const PostActions = {
    onlyText(text: string, date: string = '') {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                {date && <Typography component='span' style={{fontSize: DATE_SIZE}} color='textSecondary'>
                            {getFormattedDate(date)}
                         </Typography>
                }
            </span>
        );
    },
    textWithOk(text: string, date: string = '') {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <span className={styles.secondRow}>
                    {date && <Typography component='span' style={{fontSize: DATE_SIZE}} color='textSecondary'>
                                {getFormattedDate(date)}
                             </Typography>
                    }
                    <CheckOutlinedIcon style={{fontSize: FONT_SIZE}} color='primary' className={styles.icon}/>
                </span>
            </span>
        );
    },
    textWithWait(text: string, date: string = '') {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <span className={styles.secondRow}>
                    {date && <Typography component='span' style={{fontSize: DATE_SIZE}} color='textSecondary'>
                                {getFormattedDate(date)}
                             </Typography>
                    }
                    <ScheduleOutlinedIcon style={{fontSize: FONT_SIZE}} color='disabled' className={styles.icon}/>
                </span>
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