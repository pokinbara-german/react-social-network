import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FullPageBlock} from '../FullPageBlock/FullPageBlock';

/**
 * Returns content of not realized page.
 * @returns {JSX.Element}
 * @constructor
 */
export const NotRealized: React.FC = () => {
    return (
        <FullPageBlock>
            <Typography color='textSecondary' variant='h4'>Not realized on backend yet</Typography>
        </FullPageBlock>
    );
}