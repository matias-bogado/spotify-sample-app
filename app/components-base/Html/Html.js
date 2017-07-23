import React from 'react';
import PropTypes from 'prop-types';

class Html extends React.Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    bundle: PropTypes.object.isRequired,
    description: PropTypes.string,
    title: PropTypes.string,
    storeInitialState: PropTypes.object.isRequired
  };

  static defaultProps = {
    title: '',
    description: ''
  };

  render() {
    return (
      <html lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.props.title}</title>
          <meta name="description" content={this.props.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href={this.props.bundle.main.css} rel="stylesheet" type="text/css" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,700,300italic,700italic,400italic,400"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          {this.renderServerStoreState()}
        </head>

        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={this.props.bundle.main.js} />
          <script dangerouslySetInnerHTML={trackingCode} />
        </body>
      </html>
    );
  }

  renderServerStoreState() {
    const serverStoreState = {
      __html: `window.__STORE_INITIAL_STATE = ${JSON.stringify(this.props.storeInitialState)}`
    };

    return <script dangerouslySetInnerHTML={serverStoreState} />;
  }
}

export default Html;
