import React, { Component } from 'react';
import { setVolume, setMuteStatus } from '../actions';
import _ from 'underscore';
import { connect } from 'react-redux';

class Volume extends Component {
  handleSliderClick(event) {
    const { dispatch } = this.props;
    const elementX   = event.nativeEvent.target.clientWidth;
    const pointX     = event.nativeEvent.offsetX;
    const percentage = pointX / elementX;
    const volume     = Math.round(percentage * 10) * 10;

    dispatch(setVolume(volume));

    if (volume === 0) {
      dispatch(setMuteStatus(true));
    }
    if (0 < volume) {
      dispatch(setMuteStatus(false));
    }
  }
  handleToggle() {
    const { dispatch, volume, isMute } = this.props;

    if (isMute) {
      dispatch(setMuteStatus(false));

      if (volume === 0) {
        dispatch(setVolume(10));
      }
    } else {
      dispatch(setMuteStatus(true));
    }
  }
  getToggleButtonClassName() {
    const { volume, isMute } = this.props;

    if (isMute) {
      return 'fa fa-volume-off';
    } else if (50 <= volume) {
      return 'fa fa-volume-up';
    } else {
      return 'fa fa-volume-down';
    }
  }
  render() {
    const { volume, isMute } = this.props;
    return (
      <div id="volume">
        <div className="button mute-toggle-button" onClick={this.handleToggle.bind(this)}>
          <i className={this.getToggleButtonClassName()}></i>
        </div>
        <div className="slider" onClick={this.handleSliderClick.bind(this)}>
          <div className="fill" style={{ width: isMute ? '0%' : volume + '%' }} ></div>
          <div className="unfill" style={{ width: isMute ? '100%' : (100 - volume) + '%' }} ></div>
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingAudio: state.pickApp.playingAudio,
    volume      : state.pickApp.volume,
    isMute      : state.pickApp.isMute
  }
})(Volume);
