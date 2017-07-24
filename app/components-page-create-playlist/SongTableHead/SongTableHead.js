import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

class PlaylistTableHead extends Component {
  static propTypes = {
    columnData: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { columnData } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                {column.label}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default PlaylistTableHead;
