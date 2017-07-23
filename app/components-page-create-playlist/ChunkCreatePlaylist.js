import React, { Component } from 'react';
import Chunk from '../components-base/Chunk/Chunk';

const loadChunkComponent = () => import('./CreatePlaylist/CreatePlaylist' /* webpackChunkName: "createPlaylist" */);

class ChunkCreatePlaylist extends Component {
  render() {
    return <Chunk load={loadChunkComponent} />;
  }
}

export default ChunkCreatePlaylist;
