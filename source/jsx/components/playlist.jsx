import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

export default class PlayList extends React.Component {
  render() {
    let trackDoms = _.map(this.props.playListTracks, (track) => {
      return <div>{track.program_name},</div>;
    });

    return (
      <div>
        <h3>Play list</h3>
        <div>{trackDoms}</div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playListTracks: state.pickApp.playListTracks
  }
})(PlayList);
