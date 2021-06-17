/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {getUsers, filterType} from '../../reducers/usersReducer';
import {useDispatch, useSelector} from 'react-redux';
import Users from './Users';
import React, {useEffect} from 'react';
import {
    getCurrentPageSelector,
    getPageSizeSelector,
    getUsersFilterSelector
} from '../../Common/Selectors/Selectors';

const UsersContainer: React.FC = () => {
    const currentPage = useSelector(getCurrentPageSelector);
    const pageSize = useSelector(getPageSizeSelector);
    const filter = useSelector(getUsersFilterSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        onPageChanged();
    }, []);

    /** Gets data from ajax on call and append it to state field */
    function onPageChanged(newFilter?: filterType) {
        let actualFilter = filter;
        let actualPage = currentPage;

        if (newFilter) {
            actualFilter = newFilter;
            actualPage = 0;
        }

        dispatch(getUsers(pageSize, actualPage, actualFilter));
    }

    return <Users onPageChanged={onPageChanged}/>;
}

export default UsersContainer;