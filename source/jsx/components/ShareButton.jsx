import React, { Component } from 'react';
import { setVolume, setMuteStatus } from '../actions';
import _ from 'underscore';
import { connect } from 'react-redux';
import { showShareModal } from '../actions'

class ShareButton extends Component {
  handleClick() {
    const { dispatch } = this.props;
    dispatch(showShareModal());
  }
  render() {
    return (
      <button id="share" className="button" onClick={this.handleClick.bind(this)}>
        <i className="fa fa-share"></i>
        <div className="text">Share</div>
      </button>
    );
  }
}

export default connect()(ShareButton);
