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
                    {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/home">
                            <LandingPage />
                        </Route>
                        <Route path="/dashboard">
                            <DashboardPage />
                        </Route>
                        <Route exact  path="/signup">
                            <SignupPage />
                        </Route>
                        <Route path="/trend/:id">
                            <GraphPage />
                        </Route>
                        <Route path="/" render={()=> <LoginContainer/>} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}
