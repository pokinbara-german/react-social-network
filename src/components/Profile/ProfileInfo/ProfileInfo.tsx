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

export type propsType = {
    profile: profileType | null,
    status: string,
    isOwner: boolean,
    statusFetching: boolean,
    updateStatus: (status: string) => void,
    saveProfile: (profile: profileType) => any,
}

const ProfileInfo: React.FC<propsType> = (props) => {
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
        <div>
            <div>
                <img className={styles.wallpaper} alt='wallpaper' src={'https://miro.medium.com/max/3182/1*ZdpBdyvqfb6qM1InKR2sQQ.png'}/>
            </div>
            <div className={styles.profileDescription}>
                <ProfileAvatar largePhoto={props.profile.photos.large} isOwner={props.isOwner}/>
                <div className={styles.profileDescriptionWrapper}>
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
                            />
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;