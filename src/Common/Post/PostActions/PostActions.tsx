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

/** Object with creators of ready actions for Post component */
export const PostActions = {
    /**
     * Returns ready action where only text.
     * @param {string} text - text in action
     * @param {string=} date - string with date (optional)
     */
    onlyText(text: string, date: string = '') {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                {date && <DateBlock date={date}/>}
            </span>
        );
    },
    /**
     * Returns ready action with text and icon of read message.
     * @param {string} text - text in action
     * @param {string=} date - string with date (optional)
     */
    textWithOk(text: string, date: string = '') {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <span className={styles.secondRow}>
                    {date && <DateBlock date={date}/>}
                    <CheckOutlinedIcon style={{fontSize: FONT_SIZE}} color='primary' className={styles.icon}/>
                </span>
            </span>
        );
    },
    /**
     * Returns ready action with text and icon of unread message.
     * @param {string} text - text in action
     * @param {string=} date - string with date (optional)
     */
    textWithWait(text: string, date: string = '') {
        return (
            <span className={styles.textWithIconWrapper}>
                <Typography component='span'>{text}</Typography>
                <span className={styles.secondRow}>
                    {date && <DateBlock date={date}/>}
                    <ScheduleOutlinedIcon style={{fontSize: FONT_SIZE}} color='disabled' className={styles.icon}/>
                </span>
            </span>
        );
    },
    /**
     * Returns ready action with text, likes counter and button for add likes.
     * @param {string} text - text in action
     * @param {string} postId - ID of post
     * @param {number} likes - current number of likes
     */
    textWithLikes(text: string, postId: string, likes: number) {
        return (
            <>
                <Typography component='span'>{text}</Typography>
                <LikesBlock postId={postId} likeCount={likes}/>
            </>
        );
    }
}

type dateBlockPropsType = {
    date: string
}

/**
 *
 * @param {dateBlockPropsType} props - props object
 * @param {string} props.date - date as text
 * @constructor
 */
const DateBlock:React.FC<dateBlockPropsType> = (props) => {
    return (
        <Typography component='span' style={{fontSize: DATE_SIZE}} color='textSecondary'>
            {getFormattedDate(props.date)}
        </Typography>
    );
}