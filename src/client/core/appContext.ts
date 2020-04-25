import {createContext} from 'react';
import {DependencyContainer} from 'tsyringe';


export const AppContext = createContext<DependencyContainer>(null);