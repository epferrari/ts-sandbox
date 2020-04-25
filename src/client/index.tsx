import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {container} from 'tsyringe';

import {App} from './app';
import {loadServices} from './loadServices';

const registry = loadServices(container);

ReactDOM.render(
  <App registry={registry}/>,
  document.getElementById('app')
);