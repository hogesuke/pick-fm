import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { fetchGuests } from '../actions';
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
    const nextGuests    = nextProps.query.guest;
    const prevGuests = this.props.query.guest;

    if (JSON.stringify(nextGuests) !== JSON.stringify(prevGuests)) {
      let guestIds = nextGuests ? (Array.isArray(nextGuests) ? nextGuests : [nextGuests]) : [];
      this.fetchGuests(guestIds);
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
          <button className="remove-button" onClick={() => { this.removeGuestFilter(g.id.toString(10))}}>
            <i className="fa fa-times"></i>
          </button>
          <span>{name}</span>
        </div>
      );
    });
  }
  removeGuestFilter(id) {
    const { dispatch, query } = this.props;
    const newQuery = QueryUtil.removeQueryByValue(query, 'guest', id);
    dispatch(replaceState(null, '/search', newQuery));
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
