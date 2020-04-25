import {createContext} from 'react';
import {Registry} from './registry';

export const AppContext = createContext<Registry>(null);