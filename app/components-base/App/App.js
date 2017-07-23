import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import AsyncRoutes from '../../routes/AsyncRoutes';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <main>
        <AsyncRoutes />
      </main>
    );
  }
}

export default App;
