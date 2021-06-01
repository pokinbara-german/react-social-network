import React from "react";
import styles from './Users.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import User from "./User/User";
import {followingInProgressType, usersType} from "../../reducers/types/types";

type usersPropsType = {
    usersPage: Array<usersType>,
    isUsersFetching: boolean,
    followingInProgress: followingInProgressType,
    followUser: (userId: number) => void,
    unfollowUser: (userId: number) => void,
    onPageChanged: () => void
}

/**
 * Returns list of users and one button for update it's list.
 * @param {usersPropsType} props
 * @returns {JSX.Element}
 * @constructor
 */
const Users: React.FC<usersPropsType> = (props) => {
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