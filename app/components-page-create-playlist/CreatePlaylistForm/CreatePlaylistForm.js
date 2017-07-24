import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileStepper from 'material-ui/MobileStepper';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

import SearchBox from '../SearchBox/SearchBox';

class CreatePlaylistForm extends Component {
  static propTypes = {
    createPlaylistRequestState: PropTypes.object.isRequired, // Immutable
    searchSongsTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddSong: PropTypes.func.isRequired,
    onSearchSong: PropTypes.func.isRequired,
    onClearSearchSongs: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired
  };
  maxSteps = 2;

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      playlistName: ''
    };
  }

  render() {
    return (
      <div className="create-playlist-form">
        {this.renderStepperHeading()}
        {this.renderStep()}
        <MobileStepper {...this.getStepperProps()} />
      </div>
    )
  }

  renderStepperHeading() {
    return (
      <p>Step: {this.state.activeStep + 1}</p>
    )
  }

  renderStep() {
    const { activeStep } = this.state;
    const steps = {
      0: () => this.renderNameInput(),
      1: () => this.renderSearchBox()
    };

    return typeof steps[activeStep] === 'function' ? steps[activeStep]() : null;
  }

  renderNameInput() {
    return (
      <FormControl className="create-playlist-form__input">
        <InputLabel htmlFor="name">Playlist name</InputLabel>
        <Input {...this.getNameInputProps()} />
      </FormControl>
    );
  }

  renderSearchBox() {
    return <SearchBox {...this.getSearchBoxProps()} />;
  }

  getStepperProps() {
    return {
      type: 'dots',
      steps: 2,
      position: 'static',
      activeStep: this.state.activeStep,
      className: 'create-playlist-form__stepper',
      onBack: this.handleStepperBack,
      onNext: this.handleStepperNext,
      nextButtonText: this.state.activeStep === (this.maxSteps - 1) ? 'Create playlist' : 'Next',
      disableBack: this.state.activeStep === 0,
      disableNext: !this.state.playlistName
    };
  }

  getNameInputProps() {
    return {
      id: 'name',
      onChange: this.handleNameInputChange
    };
  }

  getSearchBoxProps() {
    return {
      createPlaylistRequestState: this.props.createPlaylistRequestState,
      onClearRequest: this.props.onClearSearchSongs,
      onFetchRequest: this.props.onSearchSong,
      onSongSelected: this.props.onAddSong,
      searchSongsTracks: this.props.searchSongsTracks
    };
  }

  handleStepperNext = () => {
    const { activeStep, playlistName } = this.state;

    if (activeStep < (this.maxSteps - 1)) {
      this.setState({
        activeStep: activeStep + 1,
      }, () => {
        if (this.state.activeStep === 1) {
          this.props.onCreatePlaylist({ playlistName }); // TODO: once wired with spotify server, refactor to wait for response
        }
      });
    } else if (activeStep === (this.maxSteps - 1)) {
      this.setState({
        redirectToManage: true
      });
    }
  };

  handleStepperBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleNameInputChange = event => {
    this.setState({ playlistName: event.target.value });
  };
}

export default CreatePlaylistForm;
