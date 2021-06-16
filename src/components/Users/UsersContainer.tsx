/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {getUsers, filterType} from '../../reducers/usersReducer';
import {connect} from 'react-redux';
import Users from './Users';
import React from 'react';
import {usersType} from '../../reducers/types/types';
import {appStateType} from '../../redux/reduxStore';
import {
    getCurrentPageSelector,
    getPageSizeSelector, getUsersFilterSelector,
    getUsersSelector
} from '../../Common/Selectors/Selectors';

type mapStatePropsType = {
    usersPage: Array<usersType>,
    currentPage: number,
    pageSize: number,
    filter: filterType
};

type mapDispatchPropsType = {
    getUsers: (pageSize: number, currentPage: number, filter: filterType) => void,
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
    onPageChanged(filter?: filterType) {
        let actualFilter = this.props.filter;
        let actualPage = this.props.currentPage;

        if (filter) {
            actualFilter = filter;
            actualPage = 0;
        }

        this.props.getUsers(this.props.pageSize, actualPage, actualFilter);
    }

    render() {
        return <Users
            onPageChanged={this.onPageChanged.bind(this)}
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
            usersPage: getUsersSelector(state),
            currentPage: getCurrentPageSelector(state),
            pageSize: getPageSizeSelector(state),
            filter: getUsersFilterSelector(state)
        }
    );
};

const mapDispatchToProps: mapDispatchPropsType =  {
    getUsers,
}

const UsersContainer = connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, mapDispatchToProps)(UsersComponent);

export default UsersContainer;