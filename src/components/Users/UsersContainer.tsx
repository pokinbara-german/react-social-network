/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {getUsers, follow, unfollow} from '../../reducers/usersReducer';
import {connect} from 'react-redux';
import Users from './Users';
import React from 'react';
import {arrayOfNumbers, usersType} from '../../reducers/types/types';
import {appStateType} from '../../redux/reduxStore';

type mapStatePropsType = {
    usersPage: Array<usersType>,
    currentPage: number,
    pageSize: number,
    isUsersFetching: boolean,
    followingInProgress: arrayOfNumbers
};

type mapDispatchPropsType = {
    getUsers: (pageSize: number, currentPage: number) => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};

type ownPropsType = {
};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

class UsersComponent extends React.Component<propsType> {
    /** Gets data for page on component first render */
    componentDidMount() {
        if (this.props.usersPage.length === 0) {
            this.onPageChanged();
        }
    }

    /** Gets data from ajax on call and append it to state field */
    onPageChanged() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    render() {
        return <Users
            usersPage={this.props.usersPage}
            onPageChanged={this.onPageChanged.bind(this)}
            unfollowUser={this.props.unfollow}
            followUser={this.props.follow}
            isUsersFetching={this.props.isUsersFetching}
            followingInProgress={this.props.followingInProgress}
        />;
    }
}

/**
 * Returns state fields for connect.
 * @param {appStateType} state - redux state
 * @returns {{usersPage: ([]|*), pageSize: (number|*), currentPage: (number|*)}}
 */
let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return (
        {
            usersPage: state.usersPage.users,
            currentPage: state.usersPage.currentPage,
            pageSize: state.usersPage.pageSize,
            isUsersFetching: state.usersPage.isUsersFetching,
            followingInProgress: state.usersPage.followingInProgress
        }
    );
};

const mapDispatchToProps: mapDispatchPropsType =  {
    getUsers,
    follow,
    unfollow
}

const UsersContainer = connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default UsersContainer;