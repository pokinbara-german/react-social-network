import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './ProfileInfo.module.css';
import Preloader from "../../../Common/Preloader/Preloader";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

type propsType = {
    status: string,
    isOwner: boolean,
    statusFetching: boolean,
    updateStatus: (status: string) => void
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        statusInput: {
            margin: theme.spacing(1),
        }
    }),
);

/**
 * Returns status block or input for editing status.
 * @param {propsType} props - props
 * @constructor
 */
const ProfileStatus: React.FC<propsType> = (props) => {
    const classes = useStyles();

    let statusText = props.status || 'No status';

    let [isStatusEditing, setStatusEditing] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditing = () => {
        let newValue = !isStatusEditing;
        setStatusEditing(newValue);

        if (!newValue && status && (statusText !== status)) {
            props.updateStatus(status);
        }
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }

    if (props.statusFetching) {
        return <Preloader notCentered={true}/>
    }

    return isStatusEditing && props.isOwner
        ? <Tooltip title="Click to empty place to save" aria-label="save status" placement="right">
            <TextField autoFocus={true}
                       onBlur={toggleEditing}
                       onChange={onStatusChange}
                       className={classes.statusInput}
                       value={status}
            />
          </Tooltip>
        : <div className={styles.statusDiv} onClick={toggleEditing}>
            {props.isOwner
                ? <Tooltip title="Click to edit" aria-label="edit status" placement="right">
                    <Typography>{statusText}</Typography>
                  </Tooltip>
                : <Typography>{statusText}</Typography>
            }
            <Divider/>
        </div>;
}

export default ProfileStatus;