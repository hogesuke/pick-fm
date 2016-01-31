import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../actions';

class SearchBox extends Component {
  handleChange(event) {
    this.props.dispatch(fetchTracks(event.target.value));
  }
  render() {
    return (
      <div>
        <input type="text" id="search-box" onChange={this.handleChange.bind(this)} placeholder="&#xf002;" />
      </div>
    );
  }
}

export default connect()(SearchBox);
