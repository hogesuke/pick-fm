import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchTracks, clearTracks } from '../actions';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
  }
  handleChange(event) {
    const { dispatch, selectedProgramId, query } = this.props;

    this.setState({ searchText: event.target.value });

    if (this.isSearchPage()) {
      dispatch(pushState(null, '/search', Object.assign({}, query, { word: event.target.value })));
      return;
    }

    if (event.target.value.length < 2) {
      return;
    }

    if (this.isProgramPage()) {
      dispatch(pushState(null, '/search', { word: event.target.value }));
      return;
    }
    if (this.isEpisodePage()) {
      dispatch(pushState(null, '/search', { program: selectedProgramId, word: event.target.value }));
      return;
    }
  }
  componentWillMount() {
    const { dispatch, query } = this.props;

    if (this.isSearchPage() && query.word) {
      this.setState({ searchText: query.word });
      dispatch(fetchTracks(query.word));
    }
  }
  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const searchText   = this.state.searchText;
    const prevQuery    = JSON.stringify(prevProps.query);
    const currentQury  = JSON.stringify(this.props.query);

    if (this.isSearchPage()) {
      if (searchText.length < 2) {
        dispatch(clearTracks());
        return;
      }
      if (prevQuery !== currentQury) {
        dispatch(fetchTracks(searchText));
      }
    }
  }
  isProgramPage() {
    const { currentLocation } = this.props;
    return /(^\/programs\/?$|^\/$|^$)/.test(currentLocation);
  }
  isEpisodePage() {
    const { currentLocation } = this.props;
    return /^\/programs\/[0-9]+\/episodes/.test(currentLocation);
  }
  isSearchPage() {
    const { currentLocation } = this.props;
    return /^\/search/.test(currentLocation);
  }
  render() {
    return (
      <div>
        <input type="text"
               id="search-box"
               value={this.state.searchText}
               onChange={this.handleChange.bind(this)}
               placeholder="&#xf002;"
        />
      </div>
    );
  }
}

export default connect(state => {
  return {
    query            : state.router.location.query,
    currentLocation  : state.router.location.pathname,
    selectedProgramId: state.pickApp.selectedProgramId
  }
})(SearchBox);
