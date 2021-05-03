import React from "react";
import styles from './Users.module.css';
import userMale from "../../assets/images/user-male.png"
import Preloader from "../../Common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import {Api} from "../API/api";

/**
 * Returns list of users and one button for update it's list.
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
const Users = (props) => {
    //TODO: move it to component
    let users = props.usersPage.map((user, userIndex) =>
        <div key={'User' + userIndex} className={styles.user}>
            <span>
                <NavLink to={'/profile/' + user.id}>
                    <img className={styles.photo} alt='ava'
                         src={user.photos.small !== null ? user.photos.small : userMale}/>
                </NavLink>
                <div>
                    {user.followed
                        ? <button onClick={() => {
                            props.updateFollowingFetching(true, user.id);
                            Api.Users.unfollow(user.id).then(isSuccessful => {
                                if (isSuccessful) {
                                    props.unfollowUser(user.id);
                                }
                                props.updateFollowingFetching(false, user.id);
                            });}}
                                  disabled={props.followingInProgress.some(id => id === user.id)}>Unfollow</button>
                        : <button onClick={() => {
                            props.updateFollowingFetching(true, user.id);
                            Api.Users.follow(user.id).then(isSuccessful => {
                                if (isSuccessful) {
                                    props.followUser(user.id);
                                }
                                props.updateFollowingFetching(false, user.id);
                            });}}
                                  disabled={props.followingInProgress.some(id => id === user.id)}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status !== null ? user.status : 'No status'}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div>
    );

    let MoreUsersComponent = () => {
        return (
            <div className={styles.moreUsersWrapper}>
                <button onClick={() => props.onPageChanged()}>More Users</button>
            </div>
        );
    }

    return (
        <div>
            {users}
            {props.isUsersFetching ? <Preloader/> : <MoreUsersComponent/>}
        </div>
    );
}

export default Users;