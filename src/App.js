//import logo from './logo.svg';
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

function App() {
    let MessagesComponent = () => <MessagesContainer/>;
    let ProfileComponent = () => <ProfileContainer/>;

    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="content">
                <Route path="/profile/:userId?" component={ProfileComponent}/>
                <Route path="/messages" component={MessagesComponent}/>
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/users" component={UsersContainer}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
    );
}

export default App;
