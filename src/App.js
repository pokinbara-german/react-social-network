import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <header className='header'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spb_metro_logo.svg/600px-Spb_metro_logo.svg.png' alt="logo" />
      </header>
      <nav className='nav'>
        <div>
          <a>Profile</a>
        </div>
        <div>
          <a>Messages</a>
        </div>
        <div>
          <a>News</a>
        </div>
        <div>
          <a>Music</a>
        </div>
        <div>
          <a>Settings</a>
        </div>
      </nav>
      <div className='content'>
        <div>
            <img src="https://image.freepik.com/free-photo/pic-du-midi-ossau-and-ayous-lake-in-the-french-pyrenees-mountains_112793-9123.jpg"/>
        </div>
        <div>
            ava + desc
        </div>
        <div>
            Posts
            <div>
                New Post
            </div>
            <div>
                Post 1
            </div>
            <div>
                Post 2
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
