/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return <nav className={styles.nav}>
        <div className={styles.item}>
          <NavLink to="/profile" activeClassName={styles.active}>Profile</NavLink>
        </div>
        <div className={styles.item}>
          <NavLink to="/messages" activeClassName={styles.active}>Messages</NavLink>
        </div>
        <div className={styles.item}>
          <NavLink to="/news" activeClassName={styles.active}>News</NavLink>
        </div>
        <div className={styles.item}>
          <NavLink to="/music" activeClassName={styles.active}>Music</NavLink>
        </div>
        <div className={styles.item}>
            <NavLink to="/users" activeClassName={styles.active}>Users</NavLink>
        </div>
        <div className={styles.item}>
          <NavLink to="/settings" activeClassName={styles.active}>Settings</NavLink>
        </div>
      </nav>
};

export default Navbar;