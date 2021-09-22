import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core';

type emptyMessagesPropsType = {
    height: string
}

/**
 * Returns block with helper text.
 * @param {emptyMessagesPropsType} props - props object.
 * @param {string} props.height - CSS string value for height (i.e. "10px").
 * @returns {JSX.Element}
 * @constructor
 */
export const EmptyMessagesList: React.FC<emptyMessagesPropsType> = (props) => {
    const useStyles = makeStyles(() =>
        createStyles({
            emptyMessages: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: props.height
            }
        })
    );

    const classes = useStyles();

    return (
        <div className={classes.emptyMessages}>
            <Typography color='textSecondary' variant='h4'>No messages yet</Typography>
            <Typography color='textSecondary' variant='h4'>send something to your opponent</Typography>
        </div>
    );
}