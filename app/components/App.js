import React from 'react';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

import Nav from './Nav';
import Home from './Home';
import Game from './Game';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/game' component={Game} />
                    </Switch>
                </div>
            </Router>
        );
    }
}