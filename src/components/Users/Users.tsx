import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import User from './User/User';
import {filterType, follow, unfollow} from '../../reducers/usersReducer';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';
import {useDispatch, useSelector} from 'react-redux';
import {
    getFollowingInProgressSelector,
    getIsUsersFetchingSelector,
    getUsersSelector
} from '../../Common/Selectors/Selectors';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

type usersPropsType = {
    onPageChanged: (filter?: filterType) => void
}

/**
 * Returns list of users and one button for update it's list.
 * @param {usersPropsType} props
 * @returns {JSX.Element}
 * @constructor
 */
const Users: React.FC<usersPropsType> = (props) => {
    let usersPage = useSelector(getUsersSelector);
    let isUsersFetching = useSelector(getIsUsersFetchingSelector);
    let followingInProgress = useSelector(getFollowingInProgressSelector);

    let dispatch = useDispatch();

    let followUser = (userId: number) => {
        dispatch(follow(userId));
    }

    let unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }

    let users = usersPage.map((user) =>
        <User key={'User' + user.id}
              user={user}
              unfollowUser={unfollowUser}
              followUser={followUser}
              followingInProgress={followingInProgress}
        />
    );

    let MoreUsersComponent = () => {
        return (
            <Box textAlign={'center'} padding={'20px'}>
                <Button variant='contained' color='primary' onClick={() => props.onPageChanged()}>More Users</Button>
            </Box>
        );
    }

    return (
        <div>
            <UsersSearchForm onPageChanged={props.onPageChanged}/>
            {users}
            {isUsersFetching ? <Preloader/> : <MoreUsersComponent/>}
        </div>
    );
}

export default Users;