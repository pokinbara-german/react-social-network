import React, {Suspense} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {makeInit} from "./reducers/appReducer";
import Preloader from "./Common/Preloader/Preloader";
import StartPage from "./components/StartPage/StartPage";
import catchReason from "./Common/CatchReason/catchReason";

const Settings = React.lazy(() => import('./components/Settings/Settings').catch(reason => catchReason(reason)));
const Music = React.lazy(() => import('./components/Music/Music').catch(reason => catchReason(reason)));
const News = React.lazy(() => import('./components/News/News').catch(reason => catchReason(reason)));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer').catch(reason => catchReason(reason)));
const MessagesContainer = React.lazy(() => import('./components/Messages/MessagesContainer').catch(reason => catchReason(reason)));

class App extends Component {
    componentDidMount() {
        this.props.makeInit();
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
                        <Route path="/" component={StartPage}/>
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

let mapStateToProps = (state) => {
    return {isInitDone: state.app.initDone}
}

export default connect(mapStateToProps, {makeInit})(App);
