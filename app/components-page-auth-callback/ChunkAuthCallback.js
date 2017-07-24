import React, { Component } from 'react';
import Chunk from '../components-base/Chunk/Chunk';

const loadChunkComponent = () => import('./AuthCallback/AuthCallback' /* webpackChunkName: "authCallback" */);

class ChunkAuthCallback extends Component {
  render() {
    return <Chunk load={loadChunkComponent} />;
  }
}

export default ChunkAuthCallback;
