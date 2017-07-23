import React, { Component } from 'react';
import Chunk from '../components-base/Chunk/Chunk';

const loadChunkComponent = () => import('./Home/Home' /* webpackChunkName: "home" */);

class ChunkHome extends Component {
  render() {
    return <Chunk load={loadChunkComponent} />;
  }
}

export default ChunkHome;
