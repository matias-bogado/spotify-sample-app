import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';

import Layout from '../../components-core/Layout/Layout';
import CreatePlaylistForm from '../CreatePlaylistForm/CreatePlaylistForm';
import { createPlaylistRequest, createPlaylistClear } from '../../redux/actions/createPlaylistActions';
import { playlistAddSong } from '../../redux/actions/playlistActions';


import './CreatePlaylist.scss';

class CreatePlaylist extends React.PureComponent {
  componentWillMount() {
    this.props.createPlaylistClear();
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
    const { createPlaylistRequest, createPlaylistRequestState } = this.props;

    return {
      onCreatePlaylist: createPlaylistRequest,
      createPlaylistRequestState
    }
  }

}

const mapStateToProps = state => {
  return {
    createPlaylistRequestState: state.createPlaylist
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createPlaylistClear: () => {
      dispatch(createPlaylistClear());
    },
    createPlaylistRequest: payload => {
      dispatch(createPlaylistRequest(payload));
    },
    addSong: song => {
      dispatch(playlistAddSong(song));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
