/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../../Common/Preloader/Preloader";
import userMale from "../../../assets/images/user-male.png"
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    let profileAvatar = props.profile.photos.large || userMale;

    return (
        <div>
          <div>
                <img className={styles.wallpaper} alt='wallpaper' src="https://miro.medium.com/max/3182/1*ZdpBdyvqfb6qM1InKR2sQQ.png"/>
          </div>
          <div className={styles.profileDescription}>
              <img className={styles.avatar} alt='ava' src={profileAvatar}/>
              <div className={styles.profileDescriptionWrapper}>
                  <span className={styles.name}>{props.profile.fullName}</span>
                  <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
              </div>
          </div>
        </div>
      );
};

export default ProfileInfo;