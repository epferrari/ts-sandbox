import * as React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Registry, ContextProvider} from './core';

import Home from './routes/home';

export class App extends React.Component<{registry: Registry}, {}> {
  public render() {
    return (
      <Router>
        <ContextProvider context={{registry: this.props.registry}}>
          <ul>
            <li><Link to='/'>Home</Link></li>
          </ul>
          <Route path='/' component={Home} />
        </ContextProvider>
      </Router>
    );
  }
}