import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/Store';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from "../Login/Login";
import App from "../Home/App";
import Profile from "../Profile/Profile";
import Stats from "../Profile/Stats";
import Histor from "../Profile/History";
import Friends from "../Friends/Friends";
import GotRequest from "../Friends/GotRequest";
import SentRequest from "../Friends/SentRequest";
import AddFriends from "../Friends/AddFriends";
import history from '../History/History';
import Lobby from '../Lobby/Lobby'
import Changer from '../Lobby/Changer';
import Compitition from '../Competition/Competition';

if (localStorage.CurrentUser) {
    let data = localStorage.getItem("CurrentUser")
    data = JSON.parse(data);
    store.dispatch({
        type: "LOGIN_USER",
        payload: data
    });
}

class MainComponent extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <Router history={history}>
                        <div>
                            {/* <Switch> */}
                            <Route exact path="/" name="Login Page" component={Login} />
                            <Route exact path="/home" name="Home Page" component={App} />
                            <Route exact path="/Profile" name="Home Page" component={Profile} />
                            <Route exact path="/Stats" name="Home Page" component={Stats} />
                            <Route exact path="/Friends" name="Friends" component={Friends} />
                            <Route exact path="/GotRequest" name="GotRequest" component={GotRequest} />
                            <Route exact path="/SentRequest" name="SentRequest" component={SentRequest} />
                            <Route exact path="/AddFriends" name="AddFriends" component={AddFriends} />
                            <Route exact path="/Lobby" name="Lobby" component={Lobby} />
                            <Route exact path="/Changer" name="Changer" component={Changer} />
                            <Route exact path="/Compitition" name="Compitition" component={Compitition} />
                            {/* </Switch> */}
                        </div>
                    </Router>
                </Provider>
            </div>

        );
    }
}

export default MainComponent;