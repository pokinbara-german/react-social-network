import React from "react";
import styles from "./User.module.css";
import {NavLink} from "react-router-dom";
import userMale from "../../../assets/images/user-male.png";

function User(props) {
    let user = props.user;
    user.photos = props.user.photos || {small: null, large: null};

    return(
        <div className={styles.user}>
            <span>
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.photo} alt='ava'
                         src={user.photos.small || userMale}/>
                </NavLink>
                <div>
                    {user.followed
                        ? <button onClick={() => {props.unfollowUser(user.id)}}
                                  disabled={props.followingInProgress.some(id => id === user.id)}>Unfollow</button>
                        : <button onClick={() => {props.followUser(user.id)}}
                                  disabled={props.followingInProgress.some(id => id === user.id)}>Follow</button>
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