import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFilterProgram, removeFilterProgram } from '../actions';
import _ from 'underscore';

class SearchOptions extends Component {
  handleFilterProgramChange(event) {
    const { value, checked } = event.target;
    const { dispatch } = this.props;

    if (checked) {
      dispatch(addFilterProgram(parseInt(value, 10)));
    } else {
      dispatch(removeFilterProgram(parseInt(value, 10)));
    }
  }
  render() {
    let { programs, filterPrograms, filterGuests } = this.props;

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

    let guestButtons = filterGuests.map((g) => {
      return (
        <button key={g.id}>{g.name_ja ? g.name_ja : (g.name_en ? g.name_en : g.nickname)}</button>
      );
    });

    return (
      <div id="search-options">
        <div>
          {programCheckboxes}
        </div>
        <div>
          {guestButtons}
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    programs      : state.pickApp.programs,
    filterPrograms: state.pickApp.filterPrograms,
    filterGuests  : state.pickApp.filterGuests
  };
})(SearchOptions);
