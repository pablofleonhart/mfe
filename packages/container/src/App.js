import React, { lazy, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({ productionPrefix: 'ct' });
const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn])

    return (
        <Router history={ history }>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth" >
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} ></AuthLazy>
                            </Route>
                            <Route path="/dashboard" >
                                {!isSignedIn && <Redirect to="/"></Redirect>}
                                <DashboardLazy ></DashboardLazy>
                            </Route>
                            <Route path="/" component={MarketingLazy} ></Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
}