import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Board from './Components/Board';

let obj;
let array=[];
  for (let i= 250; i< 280; i++) {
    
    obj = {
      "id": i,
      "src": "",
      "cat": "travels and places"
    }
    array.push(obj)
  }

  console.log(JSON.stringify(array));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
