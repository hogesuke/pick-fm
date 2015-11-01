import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrackToPlayList } from '../actions'

class Track extends Component {
  handleAddToPlayList() {
    this.props.onAddClick(this.props.track);
  }
  render() {
    return (
      <div>
        <div>{this.props.track.program_name}</div>
        <div>{this.props.track.tag_en + ',' + this.props.track.tag_ja}</div>
        <div><button onClick={this.handleAddToPlayList.bind(this)}>Add</button></div>
      </div>
    );
  }
}

export default connect()(Track);
