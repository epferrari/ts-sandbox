import * as React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {DependencyContainer} from 'tsyringe';
import {AppContext} from './core';

import Home from './routes/home';

export class App extends React.Component<{registry: DependencyContainer}, {}> {
  public render() {
    return (
      <Router>
        <AppContext.Provider value={this.props.registry}>
          <ul>
            <li><Link to='/'>Home</Link></li>
          </ul>
          <Route path='/' component={Home} />
        </AppContext.Provider>
      </Router>
    );
  }
}