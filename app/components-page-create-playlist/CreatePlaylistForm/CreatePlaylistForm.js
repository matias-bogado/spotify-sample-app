import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileStepper from 'material-ui/MobileStepper';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import { Redirect } from 'react-router-dom';

import urls from '../../routes/urls'
import SearchBox from '../SearchBox/SearchBox';
import SongTable from "../SongTable/SongTable";

class CreatePlaylistForm extends Component {
  static propTypes = {
    createPlaylistRequestState: PropTypes.object.isRequired, // Immutable
    searchSongsTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlists: PropTypes.object.isRequired, // Immutable
    onAddSong: PropTypes.func.isRequired,
    onClearSearchSongs: PropTypes.func.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
    onSearchSong: PropTypes.func.isRequired,
    onRemoveSong: PropTypes.func.isRequired
  };
  maxSteps = 2;

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      playlistName: '',
      redirectToManage: false
    };
  }

  render() {
    return (
      <div className="create-playlist-form">
        {this.renderStepperHeading()}
        {this.renderStep()}
        <MobileStepper {...this.getStepperProps()} />
        {this.renderRedirectToManage()}
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
      1: () => this.renderSecondStep()
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

  renderSecondStep() {
    const playlistId = this.props.createPlaylistRequestState.getIn(['data', 'id']);
    const songs = this.props.playlists.getIn([playlistId, 'songs'], new Map());

    return (
      <div>
        <SearchBox {...this.getSearchBoxProps()} />
        <SongTable onRemoveSong={this.handleRemoveSong} playlistId={playlistId} songs={songs}/>
      </div>
    );
  }

  renderRedirectToManage() {
    return this.state.redirectToManage ? <Redirect to={urls.home} /> : null;
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

  handleRemoveSong = payload => {
    this.props.onRemoveSong(payload)
  }
}

export default CreatePlaylistForm;
