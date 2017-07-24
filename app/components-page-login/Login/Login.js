import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Typography from 'material-ui/Typography';

import credentials from '../../../credentials/spotify';
import Layout from '../../components-core/Layout/Layout';

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

class Login extends PureComponent {
  loginPath = `https://accounts.spotify.com/authorize?${queryString.stringify({
    response_type: 'code',
    client_id: credentials.client_id,
    scope: credentials.scope,
    redirect_uri: credentials.redirect_uri,
    state: generateRandomString(16)
  })}`;

  render() {
    return (
      <div className="page-home">
        <Layout>
          <Typography type="body1" component="p">
            To start using the app, you need the get a Spotifty auth code first.
          </Typography>
          <a {...this.getLoginButtonProps()} />
        </Layout>
      </div>
    );
  }

  getLoginButtonProps() {
    return {
      children: 'Login into Spotify',
      href: this.loginPath
    };
  }
}

export default Login;
