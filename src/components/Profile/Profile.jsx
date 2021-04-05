/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return <div className={styles.content}>
        <div>
            <img src="https://miro.medium.com/max/3182/1*ZdpBdyvqfb6qM1InKR2sQQ.png"/>
        </div>
        <div>
            ava + desc
        </div>
        <MyPosts/>
      </div>
};

export default Profile;