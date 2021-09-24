import React from 'react';
import {FullPageBlock} from '../Common/FullPageBlock/FullPageBlock';
import Typography from '@material-ui/core/Typography';

export const NotFound: React.FC = () => {
    return(
        <FullPageBlock>
            <h1>404 Not Found</h1>
            <Typography variant='h4' color='textSecondary'>We are sorry but this page is not exist.</Typography>
            <Typography variant='h4' color='textSecondary'>Try to go back.</Typography>
        </FullPageBlock>
    );
}