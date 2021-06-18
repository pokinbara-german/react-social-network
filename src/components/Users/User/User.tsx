import React from 'react';
import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import userMale from '../../../assets/images/user-male.png';
import {arrayOfNumbers, usersType} from '../../../reducers/types/types';
import {Avatar, Button} from 'antd';

type userPropsType = {
    user: usersType,
    followingInProgress: arrayOfNumbers,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
}

const User: React.FC<userPropsType> = (props) => {
    let user = props.user;
    user.photos = props.user.photos || {small: null, large: null};

    return(
        <div className={styles.user}>
            <span>
                <NavLink to={'/profile/' + user.id}>
                    <Avatar className={styles.photo} size={40} alt='ava' src={user.photos.small || userMale}/>
                </NavLink>
                <div>
                    {user.followed
                        ? <Button onClick={() => {props.unfollowUser(user.id)}}
                                  disabled={props.followingInProgress.some(id => id === user.id)}>Unfollow</Button>
                        : <Button onClick={() => {props.followUser(user.id)}}
                                  disabled={props.followingInProgress.some(id => id === user.id)}>Follow</Button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status || 'No status'}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div>
    );
}

export default User;