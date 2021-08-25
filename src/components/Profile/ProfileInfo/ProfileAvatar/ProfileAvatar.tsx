import {stringOrNull} from '../../../../types';
import React, {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import userMale from '../../../../assets/images/user-male.png';
import {savePhoto} from '../../../../reducers/profileReducer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

type profileAvatarPropsType = {
    largePhoto: stringOrNull,
    isOwner: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarWrapper: {
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(38),
            height: theme.spacing(38),
        },
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
 * Returns avatar-block with avatar-image and button for upload new.
 * If user is not owner of this profile returns avatar without button.
 * @param {profileAvatarPropsType} props - url to image and isOwner.
 * @constructor
 */
export const ProfileAvatar: React.FC<profileAvatarPropsType> = (props) => {
    const classes = useStyles();

    let profileAvatarLarge = props.largePhoto || userMale;

    return (
        <div className={classes.avatarWrapper}>
            <Avatar className={classes.large} src={profileAvatarLarge}/>
            {props.isOwner && <AvatarUploadButton/>}
        </div>
    );
}

/**
 * Returns styled button for upload user's avatar.
 * @constructor
 */
const AvatarUploadButton: React.FC = () => {
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
                        startIcon={<PhotoCamera />}
                >
                    Upload
                </Button>
            </label>
        </>
    );
}