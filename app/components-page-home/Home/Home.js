import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';

import Layout from '../../components-core/Layout';
import { removePlaylistRequest } from '../../redux/actions/removePlaylistActions';

import './Home.scss';
import PlaylistTable from "../PlaylistTable/PlaylistTable";

class Home extends React.PureComponent {
  static propTypes = {
    playlistRemoveRequest: PropTypes.func.isRequired,
    playlists: PropTypes.object.isRequired // Immutable
  };

  render() {
    return (
      <div className="page-home">
        <Layout>
          {this.renderNoPlaylistsMessage()}
          {this.renderPlaylistTable()}
        </Layout>
      </div>
    );
  }

  renderNoPlaylistsMessage() {
    return !this.props.playlists.size ? (
      <Typography type="body1" component="p">
        You don't have any playlist yet
      </Typography>
    ) : null;
  }

  renderPlaylistTable() {
    return this.props.playlists.size ? <PlaylistTable {...this.getPlaylistTableProps()}/> : null;
  }

  getPlaylistTableProps() {
    const { playlists, playlistRemoveRequest } = this.props;
    return {
      playlists,
      onRemovePlaylistRequest: playlistRemoveRequest
    };
  }
}

const mapStateToProps = state => {
  return {
    playlists: state.playlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    playlistRemoveRequest: payload => {
      dispatch(removePlaylistRequest(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
