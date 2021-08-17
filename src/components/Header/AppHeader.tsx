/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './AppHeader.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuthSelector, getLoginSelector} from '../../Common/Selectors/Selectors';
import {logout} from '../../reducers/authReducer';
import logo from '../../assets/images/logo.svg';
import userMale from "../../assets/images/user-male.png";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginBlock: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        login: {
            ...theme.typography.subtitle1,
            padding: theme.spacing(1),
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        headerContentWrapper: {
            justifyContent: 'space-between'
        }
    }),
);

export const AppHeader: React.FC = () => {
    const classes = useStyles();
    const isAuth = useSelector(getIsAuthSelector);
    const login = useSelector(getLoginSelector);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout());
    }

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.headerContentWrapper}>
                <img className={styles.headerLogo}
                     src={logo}
                     alt="logo"/>
                <div>
                    {
                        isAuth
                            ? <div className={classes.loginBlock}>
                                <Avatar alt={'Header Avatar'} src={userMale}/>
                                <Typography className={classes.login}>{login}</Typography>
                                <Button variant='contained' onClick={logoutCallback}>logout</Button>
                            </div>
                            : <NavLink to='/login' className={styles.loginLink}>Login</NavLink>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
};