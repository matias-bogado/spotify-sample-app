import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableRow
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import SongTableHead from "../SongTableHead/SongTableHead";

const columnData = [
  { id: 'id', numeric: false, disablePadding: true, label: 'Spotify ID' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Playlist name' },
  { id: 'songs', numeric: true, disablePadding: false, label: 'Number of songs' },
  { id: 'options', numeric: true, disablePadding: false, label: 'Options' }
];

class SongTable extends Component {
  static propTypes = {
    onRemoveSong: PropTypes.func.isRequired,
    playlistId: PropTypes.string.isRequired,
    songs: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { songs } = this.props;

    return this.props.songs.size ? (
      <div className="song-table">
        <Table>
          <SongTableHead {...this.getTableHeadProps()}/>
          <TableBody>
            {songs.map(song => {
              const songId = song.get('id');

              return (
                <TableRow {...this.getTableRowProps(song)}>
                  <TableCell disablePadding>
                    {songId}
                  </TableCell>
                  <TableCell numeric>
                    {song.get('name')}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => this.handleRemoveSong(songId)} color="primary">
                      <DeleteIcon /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    ) : null;
  }

  getTableHeadProps() {
    return {
      columnData
    };
  }

  getTableRowProps(song) {
    return {
      key: song.get('id'),
      tabIndex: '-1'
    };
  }

  handleRemoveSong = songId => {
    this.props.onRemoveSong({ playlistId: this.props.playlistId, songId });
  }
}

export default SongTable;
