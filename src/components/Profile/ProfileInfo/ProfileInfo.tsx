/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
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
    saveProfile: (profile: profileType) => any,
}

const wallpaperBlend = 'linear-gradient(rgba(255,255,255,.95), rgba(255,255,255,.95))';
const blockWidth = '52.5ch';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wallpaper: {
            backgroundImage: `${wallpaperBlend}, url(${ProfileBackground})`,
            backgroundSize: '40%',
            margin: '-23px'
        },
        profileDescriptionWrapper: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(0, 4),
            width: blockWidth
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

    let formInitialValues = {
        fullName: props.profile.fullName,
        aboutMe: props.profile.aboutMe,
        lookingForAJob: props.profile.lookingForAJob,
        lookingForAJobDescription: props.profile.lookingForAJobDescription,
        contacts: props.profile.contacts
    }

    function onSubmit (formData: profileType) {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        }).catch(() => {});
    }

    return (
        <div className={classes.wallpaper}>
            <div className={styles.profileDescription}>
                <ProfileAvatar largePhoto={props.profile.photos.large} isOwner={props.isOwner}/>
                <div className={classes.profileDescriptionWrapper}>
                    <Typography variant='h4'>{props.profile.fullName}</Typography>
                    <ProfileStatus status={props.status}
                                   updateStatus={props.updateStatus}
                                   statusFetching={props.statusFetching}
                                   isOwner={props.isOwner}
                    />
                    {isEditMode
                            ? <AdditionalInfoForm onChancel={() => setEditMode(false)}
                                                  contacts={props.profile.contacts}
                                                  onSubmit={onSubmit}
                                                  initialValues={formInitialValues}
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