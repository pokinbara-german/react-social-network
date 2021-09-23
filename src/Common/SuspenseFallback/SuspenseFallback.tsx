import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        fallbackWrapper: {
            display: 'flex',
            flexDirection: 'column'
        },
        fallbackText: {
            display: 'flex',
            flexBasis: '80vh',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }),
);

export const SuspenseFallback: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.fallbackWrapper}>
            <Container className={classes.fallbackText}>
                <Typography color='textSecondary' variant='h3'>Loading...</Typography>
            </Container>
        </div>
    );
}