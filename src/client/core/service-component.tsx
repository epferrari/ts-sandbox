import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Registry} from './registry';

export class ServiceComponent<P, S> extends React.Component<P, S> {
  public static contextTypes = {
    registy: Registry
  }

  private registry: Registry;

  constructor(props: P, context: {registry: Registry}) {
    super(props, context);
    this.registry = context.registry;
  }

  protected getService<T>(name: string): T {
    return this.registry.getService<T>(name);
  }
}
