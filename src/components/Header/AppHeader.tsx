/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './AppHeader.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getIsAuthSelector, getLoginSelector, getOwnerPhotosSelector} from '../../selectors/selectors';
import {logout} from '../../reducers/authReducer';
import logo from '../../assets/images/logo.svg';
import userMale from "../../assets/images/user-male.png";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

type appHeaderPropsType = {
    onMenuClick: () => void
}

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
        },
        menuButton: {
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        leftPart: {
            display: 'flex'
        }
    }),
);

/**
 * Returns complete header for App with logo, menu-button, logout-button and owner-info.
 * @param {appHeaderPropsType} props - props object
 * @param {function():void} props.onMenuClick - function which will calls on menu-button click
 * @constructor
 */
export const AppHeader: React.FC<appHeaderPropsType> = (props) => {
    const classes = useStyles();
    const isAuth = useSelector(getIsAuthSelector);
    const login = useSelector(getLoginSelector);
    const ownerPhotos = useSelector(getOwnerPhotosSelector);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout());
    }

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.headerContentWrapper}>
                <div className={classes.leftPart}>
                    <IconButton color='inherit'
                                edge='start'
                                className={classes.menuButton}
                                onClick={props.onMenuClick}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img className={styles.headerLogo}
                         src={logo}
                         alt="logo"/>
                </div>
                <div>
                    {
                        isAuth
                            ? <div className={classes.loginBlock}>
                                <Avatar alt={'Header Avatar'} src={ownerPhotos?.small || userMale}/>
                                <Typography className={classes.login}>{login}</Typography>
                                <IconButton onClick={logoutCallback}>
                                    <ExitToAppOutlinedIcon/>
                                </IconButton>
                            </div>
                            : <NavLink to='/login' className={styles.loginLink}>Login</NavLink>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
};