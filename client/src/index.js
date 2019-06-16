import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainComponent from "./Components/MainComponent/MainComponent";
import Login from "./Components/Login/Login";
import {Provider} from 'react-redux';
import store from './store/Store';
// import App from './App';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<MainComponent />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
