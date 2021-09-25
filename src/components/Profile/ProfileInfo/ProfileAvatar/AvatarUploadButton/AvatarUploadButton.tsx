import React, {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {savePhoto} from '../../../../../reducers/profileReducer';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        input: {
            display: 'none',
        },
        label: {
            display: 'flex',
            justifyContent: 'center',
        }
    }),
);

/**
 * Returns styled button for upload user's avatar.
 * @constructor
 */
export const AvatarUploadButton: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    function onFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        dispatch(savePhoto(event.target.files[0]));
    }

    return (
        <>
            <input className={classes.input}
                   accept='image/*'
                   type='file'
                   id='icon-button-file'
                   onChange={onFileChange}
            />
            <label htmlFor='icon-button-file' className={classes.label}>
                <Button variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<PhotoCamera/>}
                >
                    Upload
                </Button>
            </label>
        </>
    );
}