/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {
    followUser,
    unfollowUser,
    setNextPage,
    setUsers,
    updateUsersFetching
} from "../../reducers/usersReducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import {Api} from "../API/api";

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

        Api.Users.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
            if (data === null) {
                return;
            }

            this.props.setUsers(data.items);
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

const UsersContainer = connect(mapStateToProps, {
    followUser,
    unfollowUser,
    setUsers,
    setNextPage,
    updateUsersFetching
})(UsersComponent);

export default UsersContainer;