import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

/**
 * Empty block with helper text for dialogs page.
 * @constructor
 */
export const NoDialog: React.FC = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            helperText: {
                display: 'flex',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                [theme.breakpoints.down('xs')]: {
                    display: 'none'
                }
            }
        }),
    );

    const classes = useStyles();

    return (
        <Container className={classes.helperText}>
            <Typography variant='h4' color='textSecondary'>Please click on user name to start dialog</Typography>
        </Container>
    );
}