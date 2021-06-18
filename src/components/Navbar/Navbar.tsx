/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {Menu} from 'antd';
import {ProfileOutlined, UserOutlined, MessageOutlined, BarsOutlined, CustomerServiceOutlined, ControlOutlined} from '@ant-design/icons';

const Navbar = () => {
    return(
        <Menu theme="light" mode='inline' defaultSelectedKeys={['1']} className={styles.nav}>
            <Menu.Item key="1" icon={<ProfileOutlined/>}>
                <NavLink to="/profile" activeClassName={styles.active}>Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined/>}>
                <NavLink to="/messages" activeClassName={styles.active}>Messages</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<BarsOutlined/>}>
                <NavLink to="/news" activeClassName={styles.active}>News</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<CustomerServiceOutlined/>}>
                <NavLink to="/music" activeClassName={styles.active}>Music</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined/>}>
                <NavLink to="/users" activeClassName={styles.active}>Users</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<ControlOutlined/>}>
                <NavLink to="/settings" activeClassName={styles.active}>Settings</NavLink>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;