import React from 'react';
import {routes} from '../../utils/routes';
import {NotRealized} from '../Common/NotRealized/NotRealized';

/**
 * Returns complete page of Music route.
 * @returns {JSX.Element}
 * @constructor
 */
const Music = () => {
    return(
        <div>
            <h1>{routes.music.title}</h1>
            <NotRealized/>
        </div>);
};

export default Music;