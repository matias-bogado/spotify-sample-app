import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'material-ui/Typography';

import Layout from '../../components-core/Layout';
import CreatePlaylistForm from '../CreatePlaylistForm/CreatePlaylistForm';
import { createPlaylistRequest, createPlaylistClear } from '../../redux/actions/createPlaylistActions';

import './CreatePlaylist.scss';

class CreatePlaylist extends React.PureComponent {
  componentWillMount() {
    this.props.createPlaylistClear();
  }

  render() {
    const { createPlaylistRequest, createPlaylistRequestState } = this.props;

    return (
      <div className="page-create-playlist">
        <Layout>
          <Typography type="headline" component="h3">
            Create a playlist
          </Typography>
          <CreatePlaylistForm
            onCreatePlaylist={createPlaylistRequest}
            createPlaylistRequestState={createPlaylistRequestState}
          />
        </Layout>
      </div>
    );
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
