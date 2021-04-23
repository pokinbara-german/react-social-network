/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={styles.header}>
        <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spb_metro_logo.svg/600px-Spb_metro_logo.svg.png'
            alt="logo"/>

        <div className={styles.loginBlock}>
            {props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
        </div>
    </header>
};

export default Header;