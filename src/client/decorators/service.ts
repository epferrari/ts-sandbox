import * as _ from 'lodash';
import {Component, useContext} from 'react';
import {DependencyContainer, InjectionToken} from 'tsyringe';
import {AppContext} from '../core';


export function resolve<T>(serviceName: string) {
  return <C extends Component<any>>(target: C, key: string) => {
    let instance: T;
    Object.defineProperty(target, key, {
      // tslint:disable-next-line
      get: function () {
        // tslint:disable-next-line
        return instance || (instance = resolveDependencyFromContext<T>(this, serviceName));
      }
    });
  };
}

function resolveDependencyFromContext<T>(target: Component<any>, token: InjectionToken<T>): T {
  const contextualFailureMsg = `"${target.constructor.name}" attempting to resolve "${getTokenName(token)}"`;
  const registry: DependencyContainer = useContext(AppContext);
  if (!registry) {
    throw new Error(`Registry unvailable. ${contextualFailureMsg}`);
  }
  const instance: T = registry.resolve<T>(token);
  if (!instance) {
    throw new Error(`Dependency unavailable. ${contextualFailureMsg}`);
  }

  return instance;
}

function getTokenName(token: InjectionToken<any>): string {
  if(_.isFunction(token)) {
    return token.name;
  } else {
    return token.toString();
  }
}

