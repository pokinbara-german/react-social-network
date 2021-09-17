/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useState} from 'react';
import Preloader from "../../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import AdditionalInfoForm from "./AdditionalInfoForm/AdditionalInfoForm";
import {profileType} from '../../../types';
import {ProfileAvatar} from './ProfileAvatar/ProfileAvatar';
import Typography from '@material-ui/core/Typography';
import ProfileBackground from '../../../assets/images/social-network-pattern-background.jpg';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export type propsType = {
    profile: profileType | null,
    status: string,
    isOwner: boolean,
    statusFetching: boolean,
    updateStatus: (status: string) => void,
}

const wallpaperBlend = 'linear-gradient(rgba(255,255,255,.95), rgba(255,255,255,.95))';
const blockWidth = '30ch';

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
 * @param {propsType} props - props
 * @constructor
 */
const ProfileInfo: React.FC<propsType> = (props) => {
    const classes = useStyles();

    let [isEditMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={classes.wallpaper}>
            <div className={classes.profileDescription}>
                <ProfileAvatar largePhoto={props.profile.photos.large} isOwner={props.isOwner} userId={props.profile.userId}/>
                <div className={classes.profileDescriptionWrapper}>
                    <Typography variant='h4'>{props.profile.fullName}</Typography>
                    <ProfileStatus status={props.status}
                                   updateStatus={props.updateStatus}
                                   statusFetching={props.statusFetching}
                                   isOwner={props.isOwner}
                                   blockWidth={blockWidth}
                    />
                    {isEditMode
                            ? <AdditionalInfoForm onChancel={() => setEditMode(false)}
                                                  profile={props.profile}
                            />
                            : <AdditionalInfo aboutMe={props.profile.aboutMe}
                                              lookingForAJob={props.profile.lookingForAJob}
                                              lookingForAJobDescription={props.profile.lookingForAJobDescription}
                                              contacts={props.profile.contacts}
                                              setEditMode={() => setEditMode(true)}
                                              isOwner={props.isOwner}
                                              blockWidth={blockWidth}
                            />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;