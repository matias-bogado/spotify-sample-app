import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ChunkAuthCallback from '../components-page-auth-callback/ChunkAuthCallback';
import ChunkLogin from '../components-page-login/ChunkLogin';
import ChunkHome from '../components-page-home/ChunkHome';
import ChunkCreatePlaylist from '../components-page-create-playlist/ChunkCreatePlaylist';
import urls from './urls';

const AsyncRoutes = () => (
  <Switch>
    <Route exact path={urls.authCallback} component={ChunkAuthCallback} />
    <Route exact path={urls.login} component={ChunkLogin} />
    <Route exact path={urls.home} component={ChunkHome} />
    <Route exact path={urls.createPlaylist} component={ChunkCreatePlaylist} />
    <Route component={() => <div> Error 404 </div>} />
  </Switch>
);

export default AsyncRoutes;
