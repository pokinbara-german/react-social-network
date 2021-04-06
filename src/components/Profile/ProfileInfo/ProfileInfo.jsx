/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
          <div>
                <img src="https://miro.medium.com/max/3182/1*ZdpBdyvqfb6qM1InKR2sQQ.png"/>
          </div>
          <div className={styles.profileDescription}>
                ava + desc
          </div>
        </div>
      );
};

export default ProfileInfo;