/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useState} from 'react';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import AdditionalInfoForm from "./AdditionalInfoForm/AdditionalInfoForm";
import {ProfileAvatar} from './ProfileAvatar/ProfileAvatar';
import Typography from '@material-ui/core/Typography';
import ProfileBackground from '../../../assets/images/social-network-pattern-background.jpg';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {getProfileSelector} from '../../../selectors/selectors';

export type propsType = {
    isOwner: boolean,
    blockWidth: string
}

const wallpaperBlend = 'linear-gradient(rgba(255,255,255,.95), rgba(255,255,255,.95))';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wallpaper: {
            backgroundImage: `${wallpaperBlend}, url(${ProfileBackground})`,
            backgroundSize: '40%',
            margin: theme.spacing(-3)
        },
        profileDescriptionWrapper: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            margin: theme.spacing(0, 4),
        },
        profileDescription: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: theme.spacing(1)
        }
    }),
);

/**
 * Returns profile-block with avatar, status and profile info.
 * @param {propsType} props - props object
 * @constructor
 */
const ProfileInfo: React.FC<propsType> = (props) => {
    const profile = useSelector(getProfileSelector);
    const largePhoto = profile ? profile.photos.large : null;
    const userId = profile ? profile.userId : 0;
    const classes = useStyles();

    let [isEditMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={classes.wallpaper}>
            <div className={classes.profileDescription}>
                <ProfileAvatar largePhoto={largePhoto} isOwner={props.isOwner} userId={userId}/>
                <div className={classes.profileDescriptionWrapper}>
                    <Typography variant='h4'>{profile?.fullName}</Typography>
                    <ProfileStatus isOwner={props.isOwner}
                                   blockWidth={props.blockWidth}
                    />
                    {isEditMode
                            ? <AdditionalInfoForm onChancel={() => setEditMode(false)}
                                                  profile={profile}
                            />
                            : <AdditionalInfo aboutMe={profile.aboutMe}
                                              lookingForAJob={profile.lookingForAJob}
                                              lookingForAJobDescription={profile.lookingForAJobDescription}
                                              contacts={profile.contacts}
                                              setEditMode={() => setEditMode(true)}
                                              isOwner={props.isOwner}
                                              blockWidth={props.blockWidth}
                            />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;