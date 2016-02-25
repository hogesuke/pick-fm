import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import { fetchGuests } from '../actions';
import _ from 'underscore';

class SearchOptions extends Component {
  handleFilterProgramChange(event) {
    const { value, checked } = event.target;
    const { dispatch, query } = this.props;
    let newQuery = null;

    if (checked) {
      newQuery = this.addQuery(query, 'program', value);
    } else {
      newQuery = this.removeQuery(query, 'program', value);
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
  componentWillUpdate(prevProps) {
    const prevGuests    = prevProps.query.guest;
    const currentGuests = this.props.query.guest;

    if (JSON.stringify(prevGuests) !== JSON.stringify(currentGuests)) {
      let guestIds = currentGuests ? (Array.isArray(currentGuests) ? currentGuests : [currentGuests]) : [];
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
  addQuery(currentQuery, key, value) {
    if (!currentQuery) {
      return { [key]: [value] };
    }
    if (!currentQuery[key]) {
      return Object.assign({}, currentQuery, { [key]: [value] });
    }

    return Object.assign({}, currentQuery, { [key]: [...currentQuery[key], value] });
  }
  removeQuery(currentQuery, key, value) {
    if (!currentQuery || !currentQuery[key]) {
      return currentQuery;
    }

    const queryValues = Array.isArray(currentQuery[key]) ? currentQuery[key] : [currentQuery[key]];

    if (!_.contains(queryValues, value)) {
      return currentQuery;
    }

    let newArray = _.reject(queryValues, (q) => {
      return q === value;
    });

    return Object.assign({}, currentQuery, { [key]: newArray });
  }
  getProgramDoms() {
    const { programs, query } = this.props;
    let filterIds = query.program ? (Array.isArray(query.program) ? query.program : [query.program]) : [];

    filterIds = filterIds.map((id) => {
      return parseInt(id, 10);
    });

    return programs.map((p) => {
      return (
        <label key={p.id}>
          <input
            type="checkbox"
            value={p.id}
            checked={_.contains(filterIds, p.id)}
            onChange={this.handleFilterProgramChange.bind(this)}
          />{p.name}
        </label>
      );
    });
  }
  getGuestDoms() {
    const { guests, query } = this.props;
    let filterIds = query.guest ? (Array.isArray(query.guest) ? query.guest : [query.guest]) : [];

    filterIds = filterIds.map((id) => {
      return parseInt(id, 10);
    });

    let filterGuests = _.filter(guests, (g) => {
      return _.contains(filterIds, g.id);
    });

    return filterGuests.map((g) => {
      let name = g.name_ja ? g.name_ja : (g.name_en ? g.name_en : g.nickname);
      return (
        <div key={g.id}>
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

    let newQuery = this.removeQuery(query, 'guest', id);
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
