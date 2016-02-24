import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { fetchTracks, clearTracks } from '../actions';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '', isSuspension: false };
  }
  handleChange(event) {
    const { dispatch, selectedProgramId, selectedGuestId, query, currentLocation } = this.props;

    this.setState({ searchText: event.target.value });

    if (this.isSearchPage(currentLocation)) {
      dispatch(pushState(null, '/search', Object.assign({}, query, { word: event.target.value })));
      return;
    }

    if (event.target.value.length < 2) {
      return;
    }

    if (this.isProgramPage(currentLocation)) {
      dispatch(pushState(null, '/search', { word: event.target.value }));
      return;
    }
    if (this.isProgramEpisodePage(currentLocation)) {
      dispatch(pushState(null, '/search', { program: selectedProgramId, word: event.target.value }));
      return;
    }
    if (this.isGuestEpisodePage(currentLocation)) {
      dispatch(pushState(null, '/search', { guest: selectedGuestId, word: event.target.value }));
      return;
    }
  }
  componentWillMount() {
    const { dispatch, query, currentLocation } = this.props;

    if (this.isSearchPage(currentLocation) && query.word) {
      this.setState({ searchText: query.word });
      dispatch(fetchTracks(query.word));
    }
  }
  componentWillReceiveProps(nextProps) {
    const { currentLocation } = nextProps;

    if (!this.isSearchPage(currentLocation)) {
      this.setState({ searchText: '' });
    }
  }
  componentDidUpdate(prevProps) {
    const { dispatch, currentLocation } = this.props;
    const { searchText, isSuspension } = this.state;
    const prevQuery   = JSON.stringify(prevProps.query);
    const currentQury = JSON.stringify(this.props.query);

    if (this.isSearchPage(currentLocation) && !isSuspension) {
      if (searchText.length < 2) {
        dispatch(clearTracks());
        return;
      }
      if (prevQuery !== currentQury) {
        dispatch(fetchTracks(searchText));
        this.setState({ isSuspension: true });

        // 1sec以内は次の検索リクエストを飛ばさないようにする
        setTimeout(() => {
          this.setState({ isSuspension: false });

          if (searchText !== this.state.searchText || currentQury !== JSON.stringify(this.props.query)) {
            dispatch(fetchTracks(this.state.searchText));
          }
        }, 1000);
      }
    }
  }
  isProgramPage(location) {
    return /(^\/programs\/?$|^\/$|^$)/.test(location);
  }
  isProgramEpisodePage(location) {
    return /^\/programs\/[0-9]+\/episodes/.test(location);
  }
  isGuestEpisodePage(location) {
    return /^\/guests\/[0-9]+\/episodes/.test(location);
  }
  isSearchPage(location) {
    return /^\/search/.test(location);
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
    selectedProgramId: state.pickApp.selectedProgramId,
    selectedGuestId  : state.pickApp.selectedGuestId
  }
})(SearchBox);
