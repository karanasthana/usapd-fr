import React, { Component } from 'react';
import { withRouter } from 'react-router';
import LoginPage from './LoginPage';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
  
        if (global.isLoggedIn) {
            props.history.replace('/dashboard');
        }
    }
  
    render() {
        return <LoginPage history={this.props.history} />;
    }
}
  
export default withRouter(LoginContainer);