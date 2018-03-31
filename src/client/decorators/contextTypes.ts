import {ComponentClass} from 'react';
import * as PropTypes from 'prop-types';

export function contextTypes(...contextTypes: string[]) {
  return (componentClass: ComponentClass): any => {
    componentClass.contextTypes = {
      ...(componentClass.contextTypes || {}),
      ...contextTypes.reduce((acc, key) => ({...acc, [key]: PropTypes.any.isRequired}), {})
    };

    return componentClass;
  };
}