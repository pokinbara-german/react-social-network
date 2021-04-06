import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header/>
          <Navbar/>
          <div className="content">
            <Route path="/messages" component={Messages}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/news" component={News}/>
            <Route path="/music" component={Music}/>
            <Route path="/settings" component={Settings}/>
          </div>
        </div>
      </BrowserRouter>      
  );
}

export default App;
