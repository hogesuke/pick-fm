import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
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

    dispatch(pushState(null, '/search', newQuery));
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
  render() {
    const { programs, query } = this.props;
    let filterPrograms = Array.isArray(query.program) ? query.program : [query.program];

    filterPrograms = filterPrograms.map((p) => {
      return parseInt(p);
    });

    let programCheckboxes = programs.map((p) => {
      return (
        <label key={p.id}>
          <input
            type="checkbox"
            value={p.id}
            checked={_.contains(filterPrograms, p.id)}
            onChange={this.handleFilterProgramChange.bind(this)}
          />{p.name}
        </label>
      );
    });

    return (
      <div id="search-options">
        {programCheckboxes}
      </div>
    );
  }
}

export default connect(state => {
  return {
    query   : state.router.location.query,
    programs: state.pickApp.programs
  };
})(SearchOptions);
