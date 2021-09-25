import React, {ChangeEvent, useEffect, useState} from "react";
import Preloader from "../../Common/Preloader/Preloader";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileStatusFetchingSelector, getProfileStatusSelector} from '../../../selectors/selectors';
import {updateStatus} from '../../../reducers/profileReducer';

type propsType = {
    isOwner: boolean,
    blockWidth?: string,
};

/**
 * Returns status block or input for editing status.
 * @param {propsType} props - props object
 * @param {boolean} props.isOwner - is user owner of this page
 * @param {string=} props.blockWidth - with of block (optional)
 * @param {function(status: string):void} props.updateStatus - callback for set status
 * @constructor
 */
const ProfileStatus: React.FC<propsType> = (props) => {
    const status = useSelector(getProfileStatusSelector);
    const statusFetching = useSelector(getProfileStatusFetchingSelector);
    const dispatch = useDispatch();

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            statusDiv: {
                display: 'flex',
                maxWidth: props.blockWidth || 'auto',
            },
            statusInput: {
                maxWidth: props.blockWidth || 'auto',
                margin: theme.spacing(1),
            },
            statusText: {
                overflowWrap: 'anywhere',
                flexGrow: 1,
                whiteSpace: 'pre-line'
            },
            divider: {
                maxWidth: props.blockWidth || 'auto',
            }
        }),
    );

    const classes = useStyles();

    let statusText = status || 'No status';

    let [isStatusEditing, setStatusEditing] = useState(false);
    let [newStatus, setNewStatus] = useState(status);

    useEffect(() => {
        setNewStatus(status);
    }, [status]);

    const toggleEditing = () => {
        setStatusEditing(!isStatusEditing);

        if (isStatusEditing && newStatus && (statusText !== newStatus)) {
            dispatch(updateStatus(newStatus));
        }
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(event.target.value);
    }

    if (statusFetching) {
        return <Preloader notCentered={true}/>
    }

    return isStatusEditing && props.isOwner
        ? <Tooltip title="Click to empty place to save" aria-label="save status" placement="right">
            <TextField autoFocus={true}
                       onBlur={toggleEditing}
                       onChange={onStatusChange}
                       className={classes.statusInput}
                       value={newStatus}
                       multiline={true}
            />
          </Tooltip>
        : <React.Fragment>
            <div className={classes.statusDiv} onClick={toggleEditing}>
                {props.isOwner
                    ? <Tooltip title="Click to edit" aria-label="edit status" placement="right">
                        <Typography color='textSecondary' className={classes.statusText}>{statusText}</Typography>
                    </Tooltip>
                    : <Typography color='textSecondary' className={classes.statusText}>{statusText}</Typography>
                }
            </div>
            <Divider className={classes.divider}/>
        </React.Fragment>;
}

export default ProfileStatus;