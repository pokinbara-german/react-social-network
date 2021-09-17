import React from 'react';
import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import userMale from '../../../assets/images/user-male.png';
import {arrayOfNumbers, stringOrNull, usersType} from '../../../types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {getIsAuthSelector} from '../../../Common/Selectors/Selectors';

type userPropsType = {
    user: usersType,
    followingInProgress: arrayOfNumbers,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
}

type followUnfollowButtonPropsType = {
    isFollowed: boolean,
    userId: number,
    followingInProgress: arrayOfNumbers,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
}

type userInfoType = {
    userName: string,
    userStatus: stringOrNull
}

const emptyPhotos = {small: null, large: null};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        largeAvatar: {
            width: theme.spacing(9),
            height: theme.spacing(9),
            margin: theme.spacing(1),
        },
        userCard: {
            display: 'flex',
            padding: theme.spacing(2),
            margin: theme.spacing(2, 2),
            flexBasis: 390,
        }
    }),
);

/**
 * Returns complete follow or unfollow button.
 * @param {followUnfollowButtonPropsType} props
 */
const FollowUnfollowButton: React.FC<followUnfollowButtonPropsType> = React.memo((props) => {
    let isDisabled: boolean = props.followingInProgress.some(id => id === props.userId);

    return(
        props.isFollowed
                ? <Button variant='contained'
                          onClick={() => {props.unfollowUser(props.userId)}}
                          disabled={isDisabled}>Unfollow</Button>
                : <Button variant='contained'
                          onClick={() => {props.followUser(props.userId)}}
                          disabled={isDisabled}>Follow</Button>
    );
})

/**
 * Returns block with short info about user.
 * @param {userInfoType} props
 * @constructor
 */
const UserInfo: React.FC<userInfoType> = (props) => {
    return (
        <Container>
                <span>
                    <Typography variant='h6' className={styles.overflowWrap}>{props.userName}</Typography>
                    <Typography className={styles.overflowWrap}>{props.userStatus || 'No status'}</Typography>
                </span>
        </Container>
    );
}

/**
 * Returns one card of user with avatar, one button and short info about user.
 * @param {userPropsType} props
 * @constructor
 */
const User: React.FC<userPropsType> = (props) => {
    const isAuthorized = useSelector(getIsAuthSelector);
    const classes = useStyles();
    let user = props.user;
    user.photos = props.user.photos || emptyPhotos;

    return(
        <Card variant="outlined" className={classes.userCard}>
            <div className={styles.firstColumnWrapper}>
                <NavLink to={'/profile/' + user.id}>
                    <Avatar className={classes.largeAvatar} alt='ava' src={user.photos.small || userMale}/>
                </NavLink>
                <div>
                    {isAuthorized
                    && <FollowUnfollowButton isFollowed={user.followed}
                                             userId={user.id}
                                             followingInProgress={props.followingInProgress}
                                             followUser={props.followUser}
                                             unfollowUser={props.unfollowUser}
                      />
                    }
                </div>
            </div>
            <UserInfo userName={user.name} userStatus={user.status}/>
        </Card>
    );
}

export default User;