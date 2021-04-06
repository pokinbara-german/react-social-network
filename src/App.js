import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Messages from './components/Messages/Messages';

function App() {
  return (
    <div className="app-wrapper">
      <Header/>
      <Navbar/>
      <div className="content">
        <Messages/>
      </div>
    </div>
  );
}

export default App;
