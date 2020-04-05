import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';
import Header from './Header';

export default class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/dashboard/:name/:city" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        )
    }
}