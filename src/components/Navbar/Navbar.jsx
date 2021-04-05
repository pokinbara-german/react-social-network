/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    return <nav className={styles.nav}>
        <div className={styles.item}>
          <a>Profile</a>
        </div>
        <div className={styles.item}>
          <a>Messages</a>
        </div>
        <div className={styles.item}>
          <a>News</a>
        </div>
        <div className={styles.item}>
          <a>Music</a>
        </div>
        <div className={styles.item}>
          <a>Settings</a>
        </div>
      </nav>
};

export default Navbar;