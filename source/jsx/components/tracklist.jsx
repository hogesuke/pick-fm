import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Track from './track';
import { addTrackToPlayList } from '../actions'

class TrackList extends Component {
  componentWillMount() {
    this.props.onLoad('hoge');
  }
  render() {
    let tracks = _.map(this.props.tracks, (track) => {
      return <Track onAddClick={track => this.props.dispatch(addTrackToPlayList(track))} track={track} />;
    });

    return (
      <div>
        <div style={{margin: "10px 0"}}>{tracks}</div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    tracks    : state.pickApp.tracks,
    searchText: state.pickApp.searchText
  };
})(TrackList);

