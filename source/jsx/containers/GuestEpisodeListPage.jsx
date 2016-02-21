import React, { Component } from 'react';
import { connect } from 'react-redux';
import EpisodeList from '../components/EpisodeList';
import { fetchGuestEpisodes } from '../actions';

class GuestEpisodeListPage extends Component {
  componentWillMount() {
    let { guestId } = this.props.params;
    this.props.dispatch(fetchGuestEpisodes(guestId));
  }
  componentWillUpdate(nextProps) {
    let { guestId } = nextProps.params;
    this.props.dispatch(fetchGuestEpisodes(guestId));
  }
  render() {
    return <EpisodeList />;
  }
}

export default connect()(GuestEpisodeListPage);
