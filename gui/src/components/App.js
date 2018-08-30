import React, { Component } from 'react';
import DeviceList from './DeviceList'
import Login from './Login'

class App extends Component {

  render() {
    return (
      <div>
        <Login/>
        <DeviceList/>
      </div>
    );
  }
}

export default App;
