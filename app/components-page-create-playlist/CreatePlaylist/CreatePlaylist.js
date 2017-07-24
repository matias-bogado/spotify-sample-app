import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';

import Layout from '../../components-core/Layout/Layout';
import CreatePlaylistForm from '../CreatePlaylistForm/CreatePlaylistForm';
import { createPlaylistRequest, createPlaylistClear } from '../../redux/actions/createPlaylistActions';
import { playlistAddSong } from '../../redux/actions/playlistActions';
import { searchSongsRequest, searchSongsClear } from '../../redux/actions/songActions';


import './CreatePlaylist.scss';

class CreatePlaylist extends React.PureComponent {
  static propTypes = {
    addSong: PropTypes.func.isRequired,
    createPlaylistClear: PropTypes.func.isRequired,
    createPlaylistRequest: PropTypes.func.isRequired,
    createPlaylistRequestState: PropTypes.object.isRequired,
    searchSongsTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchSongsClear: PropTypes.func.isRequired,
    searchSongsRequest: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.createPlaylistClear();
    this.props.searchSongsClear();
  }

  render() {
    return (
      <div className="page-create-playlist">
        <Layout>
          <Typography type="headline" component="h3">
            Create a playlist
          </Typography>
          <CreatePlaylistForm {...this.getFormProps()} />
        </Layout>
      </div>
    );
  }

  getFormProps() {
    const {
      searchSongsTracks,
      searchSongsRequest,
      searchSongsClear,
      createPlaylistRequest,
      createPlaylistRequestState,
      addSong,
      playlists
    } = this.props;

    return {
      createPlaylistRequestState,
      onCreatePlaylist: createPlaylistRequest,
      onClearSearchSongs: searchSongsClear,
      onSearchSong: searchSongsRequest,
      onAddSong: addSong,
      playlists,
      searchSongsTracks
    }
  }

}

const mapStateToProps = state => {
  return {
    createPlaylistRequestState: state.createPlaylist,
    searchSongsTracks: state.searchSongs.getIn(['data', 'tracks', 'items'], new List()).toJS()
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addSong: payload => {
      dispatch(playlistAddSong(payload));
    },
    createPlaylistClear: () => {
      dispatch(createPlaylistClear());
    },
    createPlaylistRequest: payload => {
      dispatch(createPlaylistRequest(payload));
    },
    searchSongsClear: () => {
      dispatch(searchSongsClear());
    },
    searchSongsRequest: payload => {
      dispatch(searchSongsRequest({ query: payload.value }));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
