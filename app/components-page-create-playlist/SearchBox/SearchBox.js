import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';


const suggestionData = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];


class SearchBox extends Component {
  static propTypes = {
    onSongSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
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
          {suggestion.label}
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
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.handleSuggestionSelected,
      renderSuggestionsContainer: this.renderSuggestionsContainer,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      inputProps: {
        autoFocus: true,
        placeholder: 'Search a country (start with a)',
        value: this.state.value,
        onChange: this.handleInputChange,
      }
    };
  }

  // This is how Autosuggest calculate suggestions for any given input value.
  getSuggestions (value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestionData.filter(country =>
      country.label.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue (suggestion) {
    return suggestion.label;
  }

  handleInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    this.props.onSongSelected(suggestion)
    console.log('SUGGESTION', suggestion, suggestionValue)
  }
}

export default SearchBox;
