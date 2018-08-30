import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionConnected } from '../actions';


class Login extends React.Component {

  constructor(props) {
    super(props);
    var connected = localStorage.getItem('token') !== "null";

    this.state = {
      user: '',
      password: '',
      connected: connected
    };

    this.props.dispatch(actionConnected(connected));

    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    // Here, we call an external AuthService. We’ll create it in the next step

    var xhr = new XMLHttpRequest();
    var url = process.env.REACT_APP_BACKEND_URL + 'api/auth';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    const that = this;
    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        if (xhr.readyState === 4) {
          var json = JSON.parse(xhr.responseText);
          localStorage.setItem('token', json.token);

          that.props.dispatch(actionConnected(true));
          that.setState({ user: '', password: '', connected: true });
        }
      }
      else {
        console.log("error", xhr.status, xhr.readyState, xhr.responseText);
        if (xhr.readyState === 4) {
          alert(xhr.responseText);
        }
      }
    };
    var data = JSON.stringify({ "username": this.state.user, "password": this.state.password });
    xhr.send(data);
  }

  logout(e) {
    e.preventDefault();
    localStorage.setItem('token', null);
    this.props.dispatch(actionConnected(false));
    this.setState({ connected: false });
  }

  onLoginChange(e) {
    this.setState({ user: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    var content;
    if (!this.state.connected) {
      content = <div className="form-group">
        <input type="text" placeholder="Username" value={this.state.user} onChange={this.onLoginChange} />
        <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        <button className="button is-warning" type="submit" onClick={this.login.bind(this)}>Login</button>
      </div>
    }
    else {
      content = <div>
        <button className="button is-warning" type="submit" onClick={this.logout.bind(this)}>Log out</button>
      </div>
    }
    return (
      <form className="tile">
        {content}
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionConnected, dispatch) }
}

export default connect(mapDispatchToProps)(Login);