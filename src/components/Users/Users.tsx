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
import {createStyles, makeStyles} from '@material-ui/core';

type usersPropsType = {
    onPageChanged: (filter?: filterType) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        usersWrapper: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
    }),
);

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

    const classes = useStyles();

    const dispatch = useDispatch();

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }

    const users = usersPage.map((user) =>
        <User key={'User' + user.id}
              user={user}
              unfollowUser={unfollowUser}
              followUser={followUser}
              followingInProgress={followingInProgress}
        />
    );

    const MoreUsersComponent = () => {
        return (
            <Box textAlign={'center'} padding={'20px'}>
                <Button variant='contained' color='primary' onClick={() => props.onPageChanged()}>More Users</Button>
            </Box>
        );
    }

    return (
        <div>
            <UsersSearchForm onPageChanged={props.onPageChanged}/>
            <div className={classes.usersWrapper}>
                {users}
            </div>
            {isUsersFetching ? <Preloader/> : <MoreUsersComponent/>}
        </div>
    );
};

export default Users;