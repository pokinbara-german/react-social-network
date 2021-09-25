import React from 'react';
import {routes} from '../../utils/routes';
import {NotRealized} from '../Common/NotRealized/NotRealized';

/**
 * Returns complete page of News route.
 * @returns {JSX.Element}
 * @constructor
 */
const News = () => {
    return(
        <div>
            <h1>{routes.news.title}</h1>
            <NotRealized/>
        </div>);
};

export default News;