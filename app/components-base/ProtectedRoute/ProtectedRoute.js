import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import urls from '../../routes/urls';

class ProtectedRoute extends React.PureComponent {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    userId: PropTypes.string
  };

  render() {
    const { component, ...otherProps } = this.props;

    return <Route {...otherProps} render={() => this.getRouteRenderComponent(otherProps)} />;
  }

  getRouteRenderComponent(props) {
    const { component: Component } = this.props;

    return this.props.userId ?
      <Component {...props} /> :
      <Redirect to={{pathname: urls.login, state: { from: props.location }}}/>;
  }
}

function mapStateToProps(storeState) {
  return {
    userId: storeState.authenticationStatus.getIn(['data', 'uid'])
  };
}

const connectOptions = {

};

export default connect(mapStateToProps, null, null, connectOptions)(ProtectedRoute);
