import React from 'react';
import {useTheme} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

type counterPropsType = {
    count: number,
    inCorner?: boolean
}

/**
 * Returns small numeric label.
 * @param {counterPropsType} props - props object
 * @param {number} props.count - number which will be show.
 * @param {boolean=} props.isInCorner - if true, will be positioned in top-right corner (optional).
 * @constructor
 */
export const Counter: React.FC<counterPropsType> = (props) => {
    const theme = useTheme();
    return (
        <Chip style={{
                margin: theme.spacing(0, 1),
                position: props.inCorner ? 'absolute' : undefined,
                top: props.inCorner ? theme.spacing(1) : undefined,
                right: props.inCorner ? theme.spacing(0) : undefined
                }}
              color='primary'
              label={props.count}
              size='small'/>
    );
}