import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { fetchGuests, setPage } from '../actions';
import QueryUtil from '../util/QueryUtil'
import _ from 'underscore';

class SearchOptions extends Component {
  handleFilterProgramChange(event) {
    const { value, checked } = event.target;
    const { dispatch, query } = this.props;
    let newQuery = null;

    if (checked) {
      newQuery = QueryUtil.addQuery(query, 'program', value);
    } else {
      newQuery = QueryUtil.removeQueryByValue(query, 'program', value);
    }

    newQuery = QueryUtil.removeQuery(newQuery, 'page');

    dispatch(setPage(1));
    dispatch(replaceState(null, '/search', newQuery));
  }
  handleRemoveGuestFilter(id) {
    const { dispatch, query } = this.props;
    let newQuery ;
    newQuery = QueryUtil.removeQueryByValue(query, 'guest', id);
    newQuery = QueryUtil.removeQuery(newQuery, 'page');

    dispatch(setPage(1));
    dispatch(replaceState(null, '/search', newQuery));
  }
  componentWillMount() {
    const { guest } = this.props.query;

    if (guest) {
      let guestIds = Array.isArray(guest) ? guest : [guest];
      this.fetchGuests(guestIds);
    }
  }
  componentWillUpdate(nextProps) {
    const { dispatch, query } = nextProps;
    const nextGuests = query.guest;
    const prevGuests = this.props.query.guest;

    if (JSON.stringify(nextGuests) !== JSON.stringify(prevGuests)) {
      let guestIds = nextGuests ? (Array.isArray(nextGuests) ? nextGuests : [nextGuests]) : [];

      this.fetchGuests(guestIds);

      dispatch(setPage(1));
      dispatch(replaceState(null, '/search', QueryUtil.removeQuery(query, 'page')));
    }
  }
  fetchGuests(ids) {
    const { dispatch, guests } = this.props;

    let guestIds = guests.map((g) => {
      return g.id;
    });

    let newGuests = _.reject(ids, (id) => {
      return _.contains(guestIds, id);
    });

    if (newGuests.length >= 1) {
      dispatch(fetchGuests(newGuests));
    }
  }
  getProgramDoms() {
    const { programs, query } = this.props;
    let filterIds = query.program ? (Array.isArray(query.program) ? query.program : [query.program]) : [];

    filterIds = filterIds.map((id) => {
      return parseInt(id, 10);
    });

    return programs.map((p) => {
      return (
        <div key={p.id} className="program">
          <label>
            <input
              type="checkbox"
              value={p.id}
              checked={_.contains(filterIds, p.id)}
              onChange={this.handleFilterProgramChange.bind(this)}
            />{p.name}
          </label>
        </div>
      );
    });
  }
  getGuestDoms() {
    const { guests, query } = this.props;

    const filterIds = query.guest ? (Array.isArray(query.guest) ? query.guest : [query.guest]) : [];
    const filterGuests = _.filter(guests, (g) => {
      return _.contains(filterIds.map((id) => { return parseInt(id, 10); }), g.id);
    });

    return filterGuests.map((g) => {
      let name = g.name_ja ? g.name_ja : (g.name_en ? g.name_en : g.nickname);
      return (
        <div key={g.id} className="guest">
          <button className="remove-button" onClick={() => { this.handleRemoveGuestFilter(g.id.toString(10))}}>
            <i className="fa fa-times"></i>
          </button>
          <span>{name}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div id="search-options">
        <div className="programs">{this.getProgramDoms()}</div>
        <div className="guests">{this.getGuestDoms()}</div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    query   : state.router.location.query,
    programs: state.pickApp.programs,
    guests  : state.pickApp.guests
  };
})(SearchOptions);
