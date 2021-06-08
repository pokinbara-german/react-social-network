import React, {Suspense} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {makeInit} from "./reducers/appReducer";
import Preloader from "./Common/Preloader/Preloader";
import StartPage from "./components/StartPage/StartPage";
import {appStateType} from './redux/reduxStore';

const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer'));

type mapStatePropsType = {
    isInitDone: boolean
}

type mapDispatchPropsType = {
    makeInit: () => void
}

type ownPropsType = {};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

class App extends React.Component<propsType> {
    catchGenericError(reason: PromiseRejectionEvent) {
        let response = reason.reason.response;
        //TODO: переписать на нормальный вывод ошибки
        alert('ERROR: сервер вернул ответ ' + response.status + ' ' + response.statusText);
    }

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.catchGenericError);
        this.props.makeInit();
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchGenericError);
    }

    render() {
        let MessagesComponent = () =>  <MessagesContainer/>;
        let ProfileComponent = () => <ProfileContainer/>;

        if (!this.props.isInitDone) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="content">
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Route exact path="/" component={StartPage}/>
                        <Route path="/profile/:userId?" component={ProfileComponent}/>
                        <Route path="/messages" component={MessagesComponent}/>
                        <Route path="/news" component={News}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/users" component={UsersContainer}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/login" component={Login}/>
                    </Suspense>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {isInitDone: state.app.initDone}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(
    mapStateToProps,
    {makeInit}
)(App);