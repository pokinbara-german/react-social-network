import React from 'react';
import {useHistory} from 'react-router-dom';
import {getRouteNameById, routes} from '../../../../Common/Routes';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        goBackButtonWrapper: {
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        }
    })
);

/**
 * Returns complete button for redirect to dialogs root.
 * @returns {JSX.Element}
 * @constructor
 */
export const GoBackButton: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();

    function closeDialog() {
        history.push(`/${getRouteNameById(routes.dialogs.id)}`);
    }

    return (
        <div className={classes.goBackButtonWrapper}>
            <IconButton onClick={closeDialog}>
                <ChevronLeftIcon/>
            </IconButton>
            <Divider/>
        </div>
    );
}