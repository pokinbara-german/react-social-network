import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FullPageBlock} from '../FullPageBlock/FullPageBlock';

export const SuspenseFallback: React.FC = () => {
    return (
        <FullPageBlock>
            <Typography color='textSecondary' variant='h3'>Loading...</Typography>
        </FullPageBlock>
    );
}