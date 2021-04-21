/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {
    followCreator,
    nextPageCreator,
    setUsersCreator,
    unfollowCreator,
    updateIsUsersFetchingCreator
} from "../../reducers/usersReducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import axios from "axios";

class UsersComponent extends React.Component {
    /** Gets data for page on component first render */
    componentDidMount() {
        if (this.props.usersPage.length === 0) {
            // props.setUsers([
            //     {id:1, name: 'Andrey', followed: true, status: 'Yo', location: {country: 'Russia', city: 'Moscow'}},
            //     {id:2, name: 'Sergey', followed: false, status: 'Yo!', location: {country: 'Russia', city: 'Norilsk'}},
            //     {id:3, name: 'Misha', followed: true, status: 'Yo!!', location: {country: 'Russia', city: 'Novgorod'}}
            //     ]);
            this.onPageChanged();
        }
    }

    /** Gets data from ajax on call and append it to state field */
    onPageChanged() {
        this.props.updateUsersFetching(true);
        this.props.setNextPage();
        axios.get(
            'https://social-network.samuraijs.com/api/1.0/users',
            {params: {
                    count: this.props.pageSize,
                    page: this.props.currentPage+1,
                }}
        )
            .then( response => {
                if (response.data.items.length === 0) {
                    return;
                }

                this.props.setUsers(response.data.items);
                this.props.updateUsersFetching(false);
            });
    }

    render() {
        return <Users
            usersPage={this.props.usersPage}
            onPageChanged={this.onPageChanged.bind(this)}
            unfollowUser={this.props.unfollowUser}
            followUser={this.props.followUser}
            isUsersFetching={this.props.isUsersFetching}
        />;
    }
}

/**
 * Returns state fields for connect.
 * @param {Object} state - redux state
 * @returns {{usersPage: ([]|*), pageSize: (number|*), currentPage: (number|*)}}
 */
let mapStateToProps = (state) => {
    return (
        {
            usersPage: state.usersPage.users,
            currentPage: state.usersPage.currentPage,
            pageSize: state.usersPage.pageSize,
            isUsersFetching: state.usersPage.isUsersFetching
        }
    );
};

/**
 * Returns dispatched events for connect.
 * @param {function} dispatch - redux function
 * @returns {{followUser: followUser, setNextPage: setNextPage, setUsers: setUsers, unfollowUser: unfollowUser}}
 */
let mapDispatchToProps = (dispatch) => {
    return (
        {
            followUser: (userId) => {
                dispatch(followCreator(userId));
            },
            unfollowUser: (userId) => {
                dispatch(unfollowCreator(userId));
            },
            setUsers: (users) => {
                dispatch(setUsersCreator(users));
            },
            setNextPage: () => {
                dispatch(nextPageCreator());
            },
            updateUsersFetching: (isUsersFetching) => {
                dispatch(updateIsUsersFetchingCreator(isUsersFetching));
            }
        }
    );
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default UsersContainer;