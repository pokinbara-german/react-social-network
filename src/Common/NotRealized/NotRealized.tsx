import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        emptyPage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh'
        }
    })
);

/**
 * Returns content of not realized page.
 * @returns {JSX.Element}
 * @constructor
 */
export const NotRealized: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.emptyPage}>
            <Typography color='textSecondary' variant='h4'>Not realized on backend yet</Typography>
        </div>
    );
}