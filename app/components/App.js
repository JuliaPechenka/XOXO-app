import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Game from './Game';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
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