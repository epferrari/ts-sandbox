import {Component} from 'react';
import {Registry} from '../core/registry';

export function getServiceFromProviderContext<T>(target: Component<any>, serviceName: string): T {
  const context = target.context;
  const contextualFailureMsg = `"${target.constructor.name}" expected to receive "${serviceName}"`;
  if (!context) {
    throw new Error(`no context provided to component. ${contextualFailureMsg}`);
  }
  if (!context.registry) {
    throw new Error(`no registry provided to component context. ${contextualFailureMsg}`);
  }
  const registry: Registry = target.context.registry;
  const service: T = registry.getService<T>(serviceName);
  if (!service) {
    throw new Error(`service does not exist. ${contextualFailureMsg}`);
  }

  return service;
}

export function service<T>(serviceName: string) {
  return <C extends Component<any>>(target: C, key: string) => {
    let service: T;
    Object.defineProperty(target, key, {
      get: function () {
        return service || (service = getServiceFromProviderContext<T>(this, serviceName));
      }
    });
  };
}