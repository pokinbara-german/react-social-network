//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';

function App(props) {
    let MessagesComponent = () => <Messages state={props.state.dialogsPage}/>;
    let ProfileComponent = () => <Profile state={props.state.profilePage}/>;

    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
