import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { setSort, setPage } from '../actions';
import QueryUtil from '../util/QueryUtil'

class Sorter extends Component {
  componentWillUpdate(nextProps) {
    const { dispatch } = this.props;
    const nextQuery = nextProps.query;
    const prevQuery = this.props.query;

    if (nextQuery.sort !== prevQuery.sort) {
      const newSort = nextQuery.sort ? nextQuery.sort : 'desc';
      dispatch(setSort(newSort));
    }
  }
  handleDescClick() {
    this.setSort('desc');
  }
  handleAscClick() {
    this.setSort('asc');
  }
  setSort(sort) {
    const { dispatch, query, currentLocation } = this.props;
    dispatch(setSort(sort));
    dispatch(setPage(1));

    const newQuery = QueryUtil.replaceQuery(query, 'sort', sort);
    dispatch(pushState(null, currentLocation, newQuery));

    if (query.page) {
      dispatch(pushState(null, currentLocation, QueryUtil.replaceQuery(newQuery, 'page', 1)));
    }
  }
  render() {
    const { sort } = this.props;
    return (
      <div id="sort-controller">
        <button onClick={ this.handleDescClick.bind(this) } className={ sort === 'desc' ? 'active' : '' }>新しい順</button>
        <button onClick={ this.handleAscClick.bind(this) } className={ sort === 'asc' ? 'active' : '' }>古い順</button>
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentLocation: state.router.location.pathname,
    query: state.router.location.query,
    sort : state.pickApp.sort
  }
})(Sorter);
