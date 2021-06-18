/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuthSelector, getLoginSelector} from '../../Common/Selectors/Selectors';
import {logout} from '../../reducers/authReducer';

export const AppHeader: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector);
    const login = useSelector(getLoginSelector);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout());
    }

    return <header className={styles.header}>
        <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spb_metro_logo.svg/600px-Spb_metro_logo.svg.png'
            alt="logo"/>

        <div className={styles.loginBlock}>
            {
                isAuth
                    ? <div>
                        {login}
                        <button className={styles.logoutButton} onClick={logoutCallback}>logout</button>
                      </div>
                    : <NavLink to='/login'>Login</NavLink>
            }
        </div>
    </header>
};