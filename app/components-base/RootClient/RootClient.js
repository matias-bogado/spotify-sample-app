import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../App/App';
import store from '../../redux/store/clientStore';
import { playlistReadFromLocalStorage } from '../../redux/actions/playlistActions';

import '../../theme/main.scss';

store.dispatch(playlistReadFromLocalStorage());

const RootClient = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <App />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

export default RootClient;
