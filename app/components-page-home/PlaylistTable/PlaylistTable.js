import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import PlaylistTableHead from "../PlaylistTableHead/PlaylistTableHead";

import keycode from 'keycode';

const columnData = [
  { id: 'id', numeric: false, disablePadding: true, label: 'Spotify ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Playlist name' },
  { id: 'songs', numeric: true, disablePadding: false, label: 'Number of songs' },
  { id: 'options', numeric: true, disablePadding: false, label: 'Options' }
];

class PlaylistTable extends Component {
  static propTypes = {
    onRemovePlaylistRequest: PropTypes.func.isRequired,
    playlists: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: new Map()
    };
  }

  render() {
    const { playlists } = this.props;

    return (
      <div className="playlist-table">
        {/*<EnhancedTableToolbar numSelected={selected.length} />*/}
        <Table>
          <PlaylistTableHead {...this.getTableHeadProps()}/>
          <TableBody>
            {playlists.map(playlist => {
              const isSelected = this.isSelected(playlist);
              const playlistId = playlist.get('id');

              return (
                <TableRow {...this.getTableRowProps(playlist)}>
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>
                    {playlistId}
                  </TableCell>
                  <TableCell numeric>
                    {playlist.get('name')}
                  </TableCell>
                  <TableCell numeric>
                    {playlist.get('songs', 0)}
                  </TableCell>
                  <TableCell numeric>
                    <Button onClick={() => this.handleRemovePlaylist(playlistId)} color="primary">
                      <DeleteIcon /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  getTableHeadProps() {
    const { order, orderBy } = this.state;

    return {
      allSelected: this.areAllOptionsSelected(),
      columnData,
      order,
      orderBy,
      onRequestSort: this.handleRequestSort,
      onSelectAllClick: this.handleSelectAllClick
    };
  }

  getTableRowProps(playlist) {
    const isSelected = this.isSelected(playlist);

    return {
      'aria-checked': isSelected,
      hover: true,
      key: playlist.get('id'),
      onClick: event => this.handleClick(event, playlist),
      onKeyDown: event => this.handleKeyDown(event, playlist),
      role: 'checkbox',
      selected: isSelected,
      tabIndex: '-1'
    };
  }

  handleKeyDown = (event, playlist) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, playlist);
    }
  };

  handleClick = (event, playlist) => {
    const { selected } = this.state;
    const playlistId = playlist.get('id');

    if (this.isSelected(playlist)) {
      this.setState({ selected: selected.delete(playlistId) });
    } else {
      this.setState({ selected: selected.set(playlistId, true) });
    }
  };

  isSelected(playlist) {
    return this.state.selected.get(playlist.get('id'), false);
  }

  areAllOptionsSelected() {
    const { playlists } = this.props;

    return this.state.selected.size === playlists.size;
  }

  handleRequestSort() {

  }

  handleSelectAllClick = () => {
    const { playlists } = this.props;
    let selected;

    if (this.areAllOptionsSelected()) {
      selected = new Map();
    } else {
      selected = new Map().withMutations(map => {
        playlists.forEach(playlist => {
          const playlistId = playlist.get('id');

          map.set(playlistId, true)
        });

        return map;
      });
    }

    this.setState({ selected });
  };

  handleRemovePlaylist = playlistId => {
    this.props.onRemovePlaylistRequest({ playlistIds: [playlistId] });
  }
}

export default PlaylistTable;
