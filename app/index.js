import ReactDOM from 'react-dom';
import React from 'react';
import RootClient from './components-base/RootClient/RootClient';

const renderApp = () => {
  ReactDOM.render(<RootClient />, document.getElementById('app'));
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components-base/App/App', () => renderApp());
}
