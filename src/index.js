import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let postsData = [
    {id: 1, text: 'Second post!', likes: 20},
    {id: 2, text: 'First post!', likes: 15},
];

let userList = [
    {id:1, name: 'Andrey'},
    {id:2, name: 'Sergey'},
    {id:3, name: 'Misha'}
];

let messageList = [
    {id: 1, text: 'First!'},
    {id: 2, text: 'Second!'},
    {id: 3, text: 'Third!'},
];

ReactDOM.render(
  <React.StrictMode>
    <App postsData={postsData} userList={userList} messageList={messageList} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
