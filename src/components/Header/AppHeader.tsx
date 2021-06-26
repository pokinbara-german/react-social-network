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
import {Layout, Button, Col, Row, Avatar, Typography} from 'antd';
import userMale from "../../assets/images/user-male.png";

export const AppHeader: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector);
    const login = useSelector(getLoginSelector);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout());
    }

    const {Header} = Layout;
    const {Text} = Typography;

    return(
        <Header className="ant-layout-header"  style={{ padding: 0, background: '#198fff'}}>
            <Row>
                <Col span={4}>
                    <img className={styles.headerLogo}
                         src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spb_metro_logo.svg/600px-Spb_metro_logo.svg.png'
                         alt="logo"/>
                </Col>
                <Col span={20}>
                    <div className={styles.loginBlock}>
                        {
                            isAuth
                                ? <div>
                                    <Avatar size={40} src={userMale}/>
                                    <Text className={styles.headerLogin}>{login}</Text>
                                    <Button className={styles.logoutButton} onClick={logoutCallback}>logout</Button>
                                </div>
                                : <NavLink to='/login'>Login</NavLink>
                        }
                    </div>
                </Col>
            </Row>
        </Header>
    );
};