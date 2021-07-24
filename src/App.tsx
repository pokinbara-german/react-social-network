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
import "antd/dist/antd.css";
import {Layout} from 'antd';
import {NotFound} from './components/NotFound';

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

const App: React.FC<propsType> = (props) => {
    const catchGenericError = (reason: PromiseRejectionEvent) => {
        let response = reason.reason.response;
        //TODO: переписать на нормальный вывод ошибки
        alert('ERROR: сервер вернул ответ ' + response.status + ' ' + response.statusText);
    };

    useEffect(() => {
        window.addEventListener('unhandledrejection', catchGenericError);
        props.makeInit();

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener('unhandledrejection', catchGenericError);
        }
    }, []);

    let MessagesComponent = () =>  <MessagesContainer/>;
    let ProfileComponent = () => <ProfileContainer/>;

    if (!props.isInitDone) {
        return <Preloader/>
    }
    const {Sider, Content, Footer} = Layout;

    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <Sider trigger={null} collapsible collapsed={false}>
                    <Navbar/>
                </Sider>
                <Content style={{padding: '0 10px'}}>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Switch>
                            <Route exact path="/" component={StartPage}/>
                            <Route path="/profile/:userId?" component={ProfileComponent}/>
                            <Route path="/messages" component={MessagesComponent}/>
                            <Route path="/news" component={News}/>
                            <Route path="/music" component={Music}/>
                            <Route path="/users" component={UsersContainer}/>
                            <Route path="/settings" component={Settings}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/chat" component={ChatPage}/>
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </Suspense>
                </Content>
            </Layout>
            <Footer style={{textAlign: 'center'}}>Social Network ©2021 Created by Shadowmaster</Footer>
        </Layout>
    );
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {isInitDone: state.app.initDone}
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(
    mapStateToProps,
    {makeInit}
)(App);
