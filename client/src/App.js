import React, { Component } from 'react';
// import Routers from './router';
import {Provider} from 'react-redux';
// import store from './store/store';
import store from './store/Store';
import MainComponent from "./Components/MainComponent/MainComponent";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponent />
      </Provider>
    );
  }
}

export default App;