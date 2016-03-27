import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrograms, setSelectedProgramId, setVolume, setMuteStatus, setPage, setSort } from '../actions';
import SearchBox from '../components/SearchBox';
import CommentButton from '../components/CommentButton';
import CommentList from '../components/CommentList';
import Player from '../components/Player';
import LocationUtil from '../util/LocationUtil'

class App extends Component {
  componentWillMount() {
    const { dispatch, currentLocation, query } = this.props;

    dispatch(fetchPrograms());

    this.handleLocationChange(currentLocation);

    const volume = this.getSavedVolume();
    if (0 <= volume && volume <= 100) {
      dispatch(setVolume(volume));
    }
    const isMute = this.getSavedMuteStatus();
    if (isMute === true || isMute === false) {
      dispatch(setMuteStatus(isMute));
    }

    if (query.page) {
      dispatch(setPage(parseInt(query.page, 10)));
    }
    if (query.sort) {
      dispatch(setSort(query.sort));
    }
  }
  componentWillUpdate(nextProps) {
    const prevPage = this.props.currentPage;
    const nextPage = nextProps.currentPage;

    if (prevPage !== nextPage) {
      this.refs.mainBody.scrollTop = 0;
    }
    this.handleLocationChange(nextProps.currentLocation);
  }
  handleLocationChange(location) {
    const { dispatch } = this.props;

    let match = location.match(/^\/programs\/(.+?)\//);
    if (match) {
      dispatch(setSelectedProgramId(parseInt(match[1], 10)));
    }
  }
  getSavedVolume() {
    return parseInt(localStorage.getItem('pickfm.volume'), 10);
  }
  getSavedMuteStatus() {
    return JSON.parse(localStorage.getItem('pickfm.isMute'));
  }
  render() {
    const { currentLocation } = this.props;
    const commentButton = LocationUtil.isProgramPage(currentLocation) ? null : <CommentButton />;
    return (
      <div id="main">
        <div id="header">
          <SearchBox />
        </div>
        <div id="main-body" ref="mainBody">
          {this.props.children}
        </div>
        <div id="over-footer">
          <div id="over-footer-container">
            { commentButton }
            <CommentList />
          </div>
        </div>
        <div id="footer">
          <Player />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentLocation: state.router.location.pathname,
    query: state.router.location.query,
    currentPage : state.pickApp.currentPage
  }
})(App);
