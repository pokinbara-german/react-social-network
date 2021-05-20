/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../../Common/Preloader/Preloader";
import userMale from "../../../assets/images/user-male.png"
import ProfileStatusWithHook from "./ProfileStatusWithHook";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import AdditionalInfoForm from "./AdditionalInfoForm/AdditionalInfoForm";

const ProfileInfo = (props) => {
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
    let profileAvatarLarge = props.profile.photos.large || userMale;

    function onFileChange(event) {
        if (!event.target.files.length) {
            return;
        }

        props.savePhoto(event.target.files[0]);
    }

    function onSubmit (formData) {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    return (
        <div>
            <div>
                <img className={styles.wallpaper} alt='wallpaper' src={'https://miro.medium.com/max/3182/1*ZdpBdyvqfb6qM1InKR2sQQ.png'}/>
            </div>
            <div className={styles.profileDescription}>
                <div>
                    <img className={styles.avatar} alt='ava' src={profileAvatarLarge}/>
                    {props.isOwner && <input type={'file'} onChange={onFileChange}/>}
                </div>
                <div className={styles.profileDescriptionWrapper}>
                    <span className={styles.name}>{props.profile.fullName}</span>
                    <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}
                                           statusFetching={props.statusFetching}/>
                    {isEditMode
                            ? <AdditionalInfoForm onChancel={() => setEditMode(false)} contacts={props.profile.contacts} onSubmit={onSubmit} initialValues={formInitialValues}/>
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