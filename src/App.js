//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import MessagesContainer from "./components/Messages/MessagesContainer";

function App() {
    let MessagesComponent = () => <MessagesContainer/>;
    let ProfileComponent = () => <Profile/>;

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="content">
                <Route path="/profile" component={ProfileComponent}/>
                <Route path="/messages" component={MessagesComponent}/>
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
    );
}

export default App;
