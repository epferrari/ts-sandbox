import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Registry} from './core';
import {App} from './app';

const registry = new Registry();

ReactDOM.render(
  <App registry={registry}/>,
  document.getElementById('app')
);