import React, {Suspense, useEffect} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Login} from "./components/Login/Login";
import {connect} from "react-redux";
import {makeInit} from "./reducers/appReducer";
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
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));
const ChatPage = React.lazy(() => import('./Pages/ChatPage'));

type mapStatePropsType = {
    isInitDone: boolean
}

type mapDispatchPropsType = {
    makeInit: () => void
}

type ownPropsType = {};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

/**
 * Returns whole app (header, menu and needed page).
 * @param {propsType} props
 * @constructor
 */
const App: React.FC<propsType> = (props) => {
    const [isNotificationOpen, setNotificationOpen] = React.useState(false);
    const [notificationText, setNotificationText] = React.useState('');

    /**
     * Catch error reason and set alert-data.
     * @param reason
     */
    const catchGenericError = (reason: PromiseRejectionEvent) => {
        let response = reason.reason.response;
        setNotificationText('ERROR: server returned ' + response.status + ' ' + response.statusText);
        setNotificationOpen(true);
    };

    useEffect(() => {
        window.addEventListener('unhandledrejection', catchGenericError);
        props.makeInit();

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener('unhandledrejection', catchGenericError);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();

    if (!props.isInitDone) {
        return <Preloader/>
    }

    return (
        <div className={classes.root}>
            <GlobalAlert isOpen={isNotificationOpen}
                         text={notificationText}
                         setNotificationOpen={setNotificationOpen}
            />
            <AppHeader/>
            <Drawer className={classes.drawer} variant='permanent' classes={{paper: classes.drawerPaper}}>
                <Toolbar />
                <Navbar/>
            </Drawer>
            <Content/>
        </div>
    );
}

/**
 * Returns correct page depends on route, uses suspend for lazy-load.
 * @constructor
 */
const Content = () => {
    const classes = useStyles();

    let MessagesComponent = () =>  <MessagesContainer/>;
    let ProfileComponent = () => <ProfileContainer/>;

    return(
        <main className={classes.content}>
            <Toolbar />
            <Suspense fallback={<div>Загрузка...</div>}>
                <Switch>
                    <Route exact path="/" component={StartPage}/>
                    <Route path={'/' + getRouteNameById(routes.profile.id) + '/:userId?'} component={ProfileComponent}/>
                    <Route path={'/' + getRouteNameById(routes.messages.id)} component={MessagesComponent}/>
                    <Route path={'/' + getRouteNameById(routes.news.id)} component={News}/>
                    <Route path={'/' + getRouteNameById(routes.music.id)} component={Music}/>
                    <Route path={'/' + getRouteNameById(routes.users.id)} component={UsersContainer}/>
                    <Route path={'/' + getRouteNameById(routes.settings.id)} component={Settings}/>
                    <Route path="/login" component={Login}/>
                    <Route path={'/' + getRouteNameById(routes.chat.id)} component={ChatPage}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Suspense>
        </main>
    );
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {isInitDone: state.app.initDone}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(
    mapStateToProps,
    {makeInit}
)(App);
