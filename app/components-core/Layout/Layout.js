import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import urls from '../../routes/urls'

const Layout = ({ children }) => {
  return (
    <Grid container gutter={24}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Spotify sample App - Manage playlist
            </Typography>
            <Button color="contrast"><Link to={urls.home}>Manage my playlists</Link></Button>
            <Button color="contrast"><Link to={urls.createPlaylist}>Create playlist</Link></Button>
          </Toolbar>
        </AppBar>

        <Grid item xs={8}>
          <Paper>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
