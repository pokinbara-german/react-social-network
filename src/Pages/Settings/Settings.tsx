import React from 'react';
import {routes} from '../../Common/Routes';
import {NotRealized} from '../../Common/NotRealized/NotRealized';

/**
 * Returns complete page of Settings route.
 * @returns {JSX.Element}
 * @constructor
 */
const Settings = () => {
    return(
        <div>
            <h1>{routes.settings.title}</h1>
            <NotRealized/>
        </div>);
};

export default Settings;