import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState, replaceState } from 'redux-router';
import { fetchTracks, clearTracks, setPage } from '../actions';
import QueryUtil from '../util/QueryUtil'
import LocationUtil from '../util/LocationUtil'

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '', isSuspension: false };
  }
  handleChange(event) {
    const { dispatch, selectedProgramId, selectedGuestId, query, currentLocation } = this.props;

    this.setState({ searchText: event.target.value });

    if (LocationUtil.isSearchPage(currentLocation)) {
      let newQuery;
      newQuery = QueryUtil.removeQuery(query, 'page');
      newQuery = QueryUtil.replaceQuery(newQuery, 'word', event.target.value);

      dispatch(setPage(1));
      dispatch(replaceState(null, '/search', newQuery));
      return;
    }

    if (event.target.value.length < 2) {
      return;
    }

    if (LocationUtil.isProgramPage(currentLocation)) {
      dispatch(pushState(null, '/search', { word: event.target.value }));
      return;
    }
    if (LocationUtil.isProgramEpisodePage(currentLocation) || LocationUtil.isProgramEpisodesPage(currentLocation)) {
      dispatch(pushState(null, '/search', { program: selectedProgramId, word: event.target.value }));
      return;
    }
    if (LocationUtil.isGuestEpisodePage(currentLocation)) {
      dispatch(pushState(null, '/search', { guest: selectedGuestId, word: event.target.value }));
      return;
    }
  }
  componentWillMount() {
    const { dispatch, query, currentLocation } = this.props;

    if (LocationUtil.isSearchPage(currentLocation) && query.word) {
      this.setState({ searchText: query.word });
      dispatch(fetchTracks(query.word));
    }
  }
  componentWillReceiveProps(nextProps) {
    const { currentLocation, query } = nextProps;
    const { searchText } = this.state;

    if (LocationUtil.isSearchPage(currentLocation)) {
      if (query.word !== searchText) {
        // ブラウザバックで検索ページに戻ってきたような場合
        this.setState({ searchText: query.word });
      }
    } else {
      this.setState({ searchText: '' });
    }
  }
  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const { searchText, isSuspension } = this.state;
    const prevLocation    = prevProps.currentLocation;
    const currentLocation = this.props.currentLocation;
    const prevQuery       = JSON.stringify(prevProps.query);
    const currentQury     = JSON.stringify(this.props.query);

    if (!LocationUtil.isSearchPage(prevLocation) && LocationUtil.isSearchPage(currentLocation)) {
      // 別のページから検索ページに移動してきた場合
      dispatch(setPage(1));
    }

    if (LocationUtil.isSearchPage(currentLocation) && !isSuspension) {
      if (searchText.length < 2) {
        dispatch(clearTracks());
        return;
      }
      if (prevQuery !== currentQury) {
        console.debug('coco', searchText);
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
  render() {
    return (
      <div id="search-box">
        <input type="text"
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
