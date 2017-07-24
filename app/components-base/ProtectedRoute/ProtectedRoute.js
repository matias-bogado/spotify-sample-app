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

    return this.props.loginStatus.getIn(['data', 'access_token']) ?
      <Component {...props} /> :
      <Redirect to={{pathname: urls.login, state: { from: props.location }}}/>;
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.login
  };
}

export default connect(mapStateToProps, null)(ProtectedRoute);
