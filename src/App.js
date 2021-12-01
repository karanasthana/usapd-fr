import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import LoginContainer from './Login/LoginContainer';
import DashboardPage from './Dashboard/DashboardPage';
import LandingPage from './Landing/LandingPage';
import GraphPage from './Graphs/GraphPage';
import SignupPage from './Signup/SignupPage';

export default function App() {
    // let isLoggedIn = true; // some logic
    return (
        <>
            <Router>
                <div>
                    <Switch>
                        <Route path="/home" component={LandingPage} />
                        <Route path="/dashboard">
                            <DashboardPage />
                        </Route>
                        <Route exact  path="/signup">
                            <SignupPage />
                        </Route>
                        <Route path="/trend/:id" component={GraphPage}>
                        </Route>
                        <Route path="/" render={()=> <LoginContainer/>} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}
