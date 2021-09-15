import React, {Suspense, useEffect} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {getInfoAfterLogin, makeInit} from "./reducers/appReducer";
import Preloader from "./Common/Preloader/Preloader";
import StartPage from "./Pages/StartPage";
import {appStateType} from './redux/reduxStore';
import {AppHeader} from './components/Header/AppHeader';
import {NotFound} from './components/NotFound';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import {getRouteNameById, routes} from './Common/Routes';
import {GlobalAlert} from './Common/GlobalAlert/GlobalAlert';

const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Messages/DialogsContainer'));
const ChatPage = React.lazy(() => import('./Pages/ChatPage'));

type mapStatePropsType = {
    isInitDone: boolean,
    isAuth: boolean
}

type mapDispatchPropsType = {
    makeInit: () => void,
    getInfoAfterLogin: () => void,
}

type ownPropsType = {};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

const drawerWidth = 240;

/**
 * Returns whole app (header, menu and needed page).
 * @param {propsType} props - props object
 * @param {boolean} props.isAuth - is user authorized
 * @param {boolean} props.isInitDone - is App initiated
 * @param {function():void} props.makeInit - App initiation function
 * @param {function():void} props.getInfoAfterLogin - function which will call after user logged in.
 * @constructor
 */
const App: React.FC<propsType> = (props) => {
    let {isAuth, isInitDone, makeInit, getInfoAfterLogin} = props;
    const [isNotificationOpen, setNotificationOpen] = React.useState(false);
    const [notificationText, setNotificationText] = React.useState('');
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
            },
            drawer: {
                width: drawerWidth,
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(7) + 1,
                },
                [theme.breakpoints.down('xs')]: {
                    display: isMenuOpen ? '' : 'none',
                },
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(7) + 1,
                },
            },
        }),
    );

    /**
     * Catch error reason and set alert-data.
     * @param reason
     */
    const catchGenericError = (reason: PromiseRejectionEvent) => {
        let response = reason.reason.response;

        if (response) {
            setNotificationText('ERROR: server returned ' + response.status + ' ' + response.statusText);
        } else {
            setNotificationText('ERROR: server is not respond!');
        }

        setNotificationOpen(true);
    };

    useEffect(() => {
        window.addEventListener('unhandledrejection', catchGenericError);
        makeInit();

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener('unhandledrejection', catchGenericError);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isAuth) {
            getInfoAfterLogin();
        }
    }, [isAuth, getInfoAfterLogin]);

    const classes = useStyles();

    if (!isInitDone) {
        return <Preloader/>
    }

    function onMenuClick() {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <div className={classes.root}>
            <GlobalAlert isOpen={isNotificationOpen}
                         text={notificationText}
                         setNotificationOpen={setNotificationOpen}
            />
            <AppHeader onMenuClick={onMenuClick}/>
            <Drawer className={classes.drawer} variant='permanent' classes={{paper: classes.drawerPaper}}>
                <Toolbar />
                <Navbar onMenuClick={onMenuClick}/>
            </Drawer>
            <Content/>
        </div>
    );
}

/**
 * Returns correct page depends on route, uses suspend for lazy-load.
 * @constructor
 */
const Content: React.FC = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            content: {
                flexGrow: 1,
                width: 330,
                padding: theme.spacing(3),
            },
        }),
    );

    const classes = useStyles();

    let DialogsComponent = () =>  <DialogsContainer/>;
    let ProfileComponent = () => <ProfileContainer/>;

    return(
        <main className={classes.content}>
            <Toolbar />
            <Suspense fallback={<div>Загрузка...</div>}>
                <Switch>
                    <Route exact path="/" component={StartPage}/>
                    <Route path={'/' + getRouteNameById(routes.profile.id) + '/:userId?'} component={ProfileComponent}/>
                    <Route path={'/' + getRouteNameById(routes.dialogs.id) + '/:userId?'} component={DialogsComponent}/>
                    <Route path={'/' + getRouteNameById(routes.news.id)} component={News}/>
                    <Route path={'/' + getRouteNameById(routes.music.id)} component={Music}/>
                    <Route path={'/' + getRouteNameById(routes.users.id)} component={UsersContainer}/>
                    <Route path={'/' + getRouteNameById(routes.settings.id)} component={Settings}/>
                    <Route path={'/' + getRouteNameById(routes.chat.id)} component={ChatPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Suspense>
        </main>
    );
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        isInitDone: state.app.initDone,
        isAuth: state.auth.isAuth
    }
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(
    mapStateToProps,
    {makeInit, getInfoAfterLogin}
)(App);
