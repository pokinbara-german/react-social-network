import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FullPageBlock} from '../../../../Common/FullPageBlock/FullPageBlock';

/**
 * Returns block with helper text.
 * @returns {JSX.Element}
 * @constructor
 */
export const EmptyMessagesList: React.FC = () => {
    return (
        <FullPageBlock>
            <Typography color='textSecondary' variant='h4'>No messages yet</Typography>
            <Typography color='textSecondary' variant='h4'>send something to your opponent</Typography>
        </FullPageBlock>
    );
}