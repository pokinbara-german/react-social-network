import {createStyles, makeStyles} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        fullPageBlock: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh'
        }
    })
);

/**
 * Returns full page block where children elements aligned to center.
 * @returns {JSX.Element}
 * @constructor
 */
export const FullPageBlock: React.FC = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.fullPageBlock}>
            {props.children}
        </div>
    );
}