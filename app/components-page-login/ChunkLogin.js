import React, { Component } from 'react';
import Chunk from '../components-base/Chunk/Chunk';

const loadChunkComponent = () => import('./Login/Login' /* webpackChunkName: "login" */);

class ChunkLogin extends Component {
  render() {
    return <Chunk load={loadChunkComponent} />;
  }
}

export default ChunkLogin;
