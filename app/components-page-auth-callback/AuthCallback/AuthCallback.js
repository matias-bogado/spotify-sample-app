import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { LinearProgress } from 'material-ui/Progress';

import urls from '../../routes/urls'
import Layout from '../../components-core/Layout/Layout';
import { loginRequest, loginClear } from '../../redux/actions/loginActions';

class AuthCallback extends PureComponent {
  static propTypes = {
    loginClear: PropTypes.func.isRequired,
    loginRequest: PropTypes.func.isRequired,
    loginStatus: PropTypes.object.isRequired // Immutable
  };

  constructor(props) {
    super(props);
    this.state = {
      code: null
    };
  }

  componentWillMount() {
    this.props.loginClear();
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    const code = qs.code || null;

    this.props.loginRequest({ code });
  }

  render() {
    return (
      <div className="page-home">
        <Layout>
          {this.renderLoading()}
          {this.renderError()}
          {this.renderSuccessRedirect()}
        </Layout>
      </div>
    );
  }

  renderLoading() {
    return this.props.loginStatus.get('isLoading') ? (
      <div>
        <Typography type="body1" component="p">
          We're connecting to Spotify API
        </Typography>
        <LinearProgress />
      </div>
    ) : null;
  }

  renderError() {
    const error = this.props.loginStatus.get('error');
    return error ? (
      <div>
        <Typography type="body1" className="error" component="p">
          An error has occurred: {error.error_description}
        </Typography>
        <Typography type="body1" component="p">
          You need to login again
        </Typography>
        <Button color="primary"><Link to={urls.login}>Login</Link></Button>
      </div>
    ) : null;
  }

  renderSuccessRedirect() {
    return this.props.loginStatus.getIn(['data', 'access_token']) ? <Redirect to={urls.home} /> : null;
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginClear: () => {
      dispatch(loginClear());
    },
    loginRequest: payload => {
      dispatch(loginRequest(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthCallback);
