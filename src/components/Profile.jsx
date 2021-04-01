/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Profile.module.css';

const Profile = () => {
    return <div className={styles.content}>
        <div>
            <img src="https://image.freepik.com/free-photo/pic-du-midi-ossau-and-ayous-lake-in-the-french-pyrenees-mountains_112793-9123.jpg"/>
        </div>
        <div>
            ava + desc
        </div>
        <div>
            Posts
            <div>
                New Post
            </div>
            <div className={styles.item}>
                Post 1
            </div>
            <div className={styles.item}>
                Post 2
            </div>
        </div>
      </div>
};

export default Profile;