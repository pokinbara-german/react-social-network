//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

function App() {
    let MessagesComponent = () => <MessagesContainer/>;
    let ProfileComponent = () => <ProfileContainer/>;

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="content">
                <Route path="/profile" component={ProfileComponent}/>
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
