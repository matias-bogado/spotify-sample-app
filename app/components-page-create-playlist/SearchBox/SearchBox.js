import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

class SearchBox extends Component {
  static propTypes = {
    createPlaylistRequestState: PropTypes.func.isRequired,
    onClearRequest: PropTypes.func.isRequired,
    onFetchRequest: PropTypes.func.isRequired,
    onSongSelected: PropTypes.func.isRequired,
    searchSongsTracks: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render () {
    return (
      <Autosuggest {...this.getAutoSuggestProps()}/>
    );
  }

  renderInput(inputProps) {
    const { home, value, ref, ...other } = inputProps;

    return (
      <TextField
        autoFocus={home}
        value={value}
        inputRef={ref}
        InputProps={{ ...other }}
      />
    );
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {suggestion.artists[0].name} - {suggestion.name}
        </div>
      </MenuItem>
    );
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }


  getAutoSuggestProps() {
    return {
      // theme: {
      //   container: classes.container,
      //   suggestionsContainerOpen: classes.suggestionsContainerOpen,
      //   suggestionsList: classes.suggestionsList,
      //   suggestion: classes.suggestion,
      // },
      renderInputComponent: this.renderInput,
      suggestions: this.props.searchSongsTracks,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.handleSuggestionSelected,
      renderSuggestionsContainer: this.renderSuggestionsContainer,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      inputProps: {
        autoFocus: true,
        placeholder: 'Search tracks',
        value: this.state.value,
        onChange: this.handleInputChange,
      }
    };
  }

  getSuggestionValue () {
    return '';
  }

  handleInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  handleSuggestionsFetchRequested = ({ value }) => {
    this.props.onFetchRequest({ value })
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  handleSuggestionsClearRequested = () => {
    this.props.onClearRequest()
  };

  handleSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    const playlistId = this.props.createPlaylistRequestState.getIn(['data', 'id']);

    this.props.onSongSelected({ song: suggestion, playlistId })
  }
}

export default SearchBox;
