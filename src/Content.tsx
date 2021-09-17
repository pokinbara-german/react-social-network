import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import ProfileContainer from './components/Profile/ProfileContainer';
import Toolbar from '@material-ui/core/Toolbar';
import {Route, Switch} from 'react-router-dom';
import StartPage from './Pages/StartPage';
import {getRouteNameById, routes} from './Common/Routes';
import {Login} from './components/Login/Login';
import {NotFound} from './components/NotFound';

const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Messages/Dialogs'));
const ChatPage = React.lazy(() => import('./Pages/ChatPage'));

/**
 * Returns correct page depends on route, uses suspend for lazy-load.
 * @constructor
 */
export const Content: React.FC = () => {
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

    let DialogsComponent = () => <DialogsContainer/>;
    let ProfileComponent = () => <ProfileContainer/>;

    return (
        <main className={classes.content}>
            <Toolbar/>
            <React.Suspense fallback={<div>Загрузка...</div>}>
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
            </React.Suspense>
        </main>
    );
}