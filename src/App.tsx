import React from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {useDispatch, useSelector} from "react-redux";
import {makeInit} from "./reducers/appReducer";
import Preloader from "./Common/Preloader/Preloader";
import {AppHeader} from './components/Header/AppHeader';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import {GlobalAlert} from './Common/GlobalAlert/GlobalAlert';
import {Content} from './Content';
import {getAppInitDoneSelector} from './Common/Selectors/Selectors';

const DRAWER_WIDTH = 240;

/**
 * Returns whole app (header, menu and needed page).
 * @constructor
 */
const App: React.FC = () => {
    const dispatch = useDispatch();
    const isInitDone = useSelector(getAppInitDoneSelector);
    const [isNotificationOpen, setNotificationOpen] = React.useState(false);
    const [notificationText, setNotificationText] = React.useState('');
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
            },
            drawer: {
                width: DRAWER_WIDTH,
                [theme.breakpoints.down('md')]: {
                    width: theme.spacing(7) + 1,
                },
                [theme.breakpoints.down('xs')]: {
                    display: isMenuOpen ? '' : 'none',
                },
                flexShrink: 0,
            },
            drawerPaper: {
                width: DRAWER_WIDTH,
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

    React.useEffect(() => {
        window.addEventListener('unhandledrejection', catchGenericError);
        dispatch(makeInit());

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener('unhandledrejection', catchGenericError);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

export default App
