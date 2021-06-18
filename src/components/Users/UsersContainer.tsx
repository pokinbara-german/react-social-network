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
import {useHistory} from 'react-router-dom';
import * as queryString from 'querystring';

type queryType = {
    searchTerm?: string,
        friend?: string,
}

const UsersContainer: React.FC = () => {
    const currentPage = useSelector(getCurrentPageSelector);
    const pageSize = useSelector(getPageSizeSelector);
    const filter = useSelector(getUsersFilterSelector);
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: подумать, как можно подхватывать изменения на ходу, а не при старте
        let parsed: queryType = queryString.parse(history.location.search.substr(1));
        let newFilter = {...filter};

        newFilter.searchTerm = parsed.searchTerm || null;
        newFilter.friend = parsed.friend === undefined ? null : parsed.friend === 'true';

        onPageChanged(newFilter);
    }, []);

    useEffect(() => {
        let query = constructQuery(filter);

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(query)
        });
    }, [filter, history]);

    /**
     * Constructs query object from filter
     * @param {filterType} filter - filter object
     */
    function constructQuery (filter: filterType) {
        let query: queryType = {};

        if (filter.searchTerm) {
            query.searchTerm = filter.searchTerm;
        }

        if (filter.friend !== null) {
            query.friend = String(filter.friend);
        }

        return query;
    }

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