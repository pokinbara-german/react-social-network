import {stringOrNull} from '../../../../types';
import React from 'react';
import userMale from '../../../../assets/images/user-male.png';
import Avatar from '@material-ui/core/Avatar';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AvatarUploadButton} from './AvatarUploadButton/AvatarUploadButton';
import {AddDialogButton} from './AddDialogButton/AddDialogButton';

type profileAvatarPropsType = {
    largePhoto: stringOrNull,
    isOwner: boolean,
    userId: number
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
        }
    }),
);

/**
 * Returns avatar-block with avatar-image and button for upload new.
 * If user is not owner of this profile returns avatar without button.
 * @param {profileAvatarPropsType} props - url to image, user ID and isOwner.
 * @constructor
 */
export const ProfileAvatar: React.FC<profileAvatarPropsType> = (props) => {
    const classes = useStyles();
    const profileAvatarLarge = props.largePhoto || userMale;

    return (
        <div className={classes.avatarWrapper}>
            <Avatar className={classes.large} src={profileAvatarLarge}/>
            {props.isOwner ? <AvatarUploadButton/> : <AddDialogButton userId={props.userId} />}
        </div>
    );
}