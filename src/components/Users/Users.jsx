import React from "react";
import styles from './Users.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import User from "./User/User";

/**
 * Returns list of users and one button for update it's list.
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
const Users = (props) => {
    let users = props.usersPage.map((user) =>
        <User key={'User' + user.id}
              user={user}
              unfollowUser={props.unfollowUser}
              followUser={props.followUser}
              followingInProgress={props.followingInProgress}
        />
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