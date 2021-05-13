import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {makeInit} from "./reducers/appReducer";
import Preloader from "./Common/Preloader/Preloader";
import StartPage from "./components/StartPage/StartPage";

class App extends Component {
    componentDidMount() {
        this.props.makeInit();
    }

    render() {
        let MessagesComponent = () => <MessagesContainer/>;
        let ProfileComponent = () => <ProfileContainer/>;

        if (!this.props.isInitDone) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="content">
                    <Route path="/" component={StartPage}/>
                    <Route path="/profile/:userId?" component={ProfileComponent}/>
                    <Route path="/messages" component={MessagesComponent}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/users" component={UsersContainer}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/login" component={Login}/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {isInitDone: state.app.initDone}
}

export default connect(mapStateToProps, {makeInit})(App);
