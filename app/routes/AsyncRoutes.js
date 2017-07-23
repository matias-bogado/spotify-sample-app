import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ChunkHome from '../components-page-home/ChunkHome';
import ChunkCreatePlaylist from '../components-page-create-playlist/ChunkCreatePlaylist';
import urls from './urls';

// TODO: 404 routes
const AsyncRoutes = () => (
  <Switch>
    <Route exact path={urls.home} component={ChunkHome} />
    <Route exact path={urls.createPlaylist} component={ChunkCreatePlaylist} />
    <Route component={() => <div> Error 404 </div>} />
  </Switch>
);

export default AsyncRoutes;
