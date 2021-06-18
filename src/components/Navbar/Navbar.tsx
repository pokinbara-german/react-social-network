/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Navbar.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import {Menu} from 'antd';
import {ProfileOutlined, UserOutlined, MessageOutlined, BarsOutlined, CustomerServiceOutlined, ControlOutlined} from '@ant-design/icons';

const Navbar = () => {
    const history = useHistory();

    return(
        <Menu theme='light' mode='inline' defaultSelectedKeys={[history.location.pathname]} className={styles.nav}>
            <Menu.Item key='/profile' icon={<ProfileOutlined/>}>
                <NavLink to='/profile' activeClassName={styles.active}>Profile</NavLink>
            </Menu.Item>
            <Menu.Item key='/messages' icon={<MessageOutlined/>}>
                <NavLink to='/messages' activeClassName={styles.active}>Messages</NavLink>
            </Menu.Item>
            <Menu.Item key='/news' icon={<BarsOutlined/>}>
                <NavLink to="/news" activeClassName={styles.active}>News</NavLink>
            </Menu.Item>
            <Menu.Item key='/music' icon={<CustomerServiceOutlined/>}>
                <NavLink to='/music' activeClassName={styles.active}>Music</NavLink>
            </Menu.Item>
            <Menu.Item key='/users' icon={<UserOutlined/>}>
                <NavLink to='/users' activeClassName={styles.active}>Users</NavLink>
            </Menu.Item>
            <Menu.Item key='/settings' icon={<ControlOutlined/>}>
                <NavLink to='/settings' activeClassName={styles.active}>Settings</NavLink>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;