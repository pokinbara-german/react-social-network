import React from "react";
import styles from './Users.module.css';
import userMale from "../../assets/images/user-male.png"

/**
 * Returns list of users and one button for update it's list.
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
const Users = (props) => {
    //TODO: move it to component
    let users = props.usersPage.map( (user, userIndex) =>
        <div key={'User' + userIndex} className={styles.user}>
            <span>
                <div>
                    <img className={styles.photo} alt='ava'
                         src={user.photos.small !== null ? user.photos.small : userMale}/>
                </div>
                <div>
                    {user.followed
                        ? <button onClick={() => props.unfollowUser(user.id)}>Unfollow</button>
                        : <button onClick={() => props.followUser(user.id)}>Follow</button>
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

    return (
        <div>
            {users}
            <div className={styles.moreUsersWrapper}>
                <button onClick={() => props.onPageChanged()}>More Users</button>
            </div>
        </div>
    );
}

export default Users;