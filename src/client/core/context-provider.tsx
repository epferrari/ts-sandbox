import * as React from 'react';
import * as PropTypes from 'prop-types';

export class ContextProvider extends React.Component<{context: object}, {}> {
  public static childContextTypes = {
    registry: PropTypes.object
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  public getChildContext() {
    return this.props.context;
  }

  public render() {
    return <div>{this.props.children}</div>;
  }
}

