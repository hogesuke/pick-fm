import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { setPage } from '../actions';
import QueryUtil from '../util/QueryUtil'

class Paging extends Component {
  constructor(props) {
    super(props);
  }
  handleNextClick() {
    const { currentPage } = this.props;
    this.setPage(currentPage + 1);
  }
  handlePrevClick() {
    const { currentPage } = this.props;
    this.setPage(currentPage - 1);
  }
  handleLastClick() {
    this.setPage(this.getLastPage());
  }
  handleFirstClick() {
    this.setPage(1);
  }
  setPage(page) {
    const { dispatch, query, currentLocation } = this.props;
    dispatch(setPage(page));
    dispatch(pushState(null, currentLocation, QueryUtil.replaceQuery(query, 'page', page)));
  }
  getLastPage() {
    const { total, perPage } = this.props;
    return Math.floor(total / perPage) + (total % perPage === 0 ? 0 : 1);
  }
  hasNextPage() {
    const { currentPage } = this.props;
    return currentPage < this.getLastPage();
  }
  hasPrevPage() {
    const { currentPage } = this.props;
    return 1 < currentPage;
  }
  render() {
    const { currentPage } = this.props;
    const firstLink = (() => {
      if (currentPage !== 1) {
        return <a className="paging-link" onClick={ this.handleFirstClick.bind(this) }><i className="fa fa-angle-double-left"></i> First</a>
      } else {
        return <span className="paging-inactive"><i className="fa fa-angle-double-left"></i> First</span>
      }
    })();
    const prevLink = (() => {
      if (this.hasPrevPage()) {
        return <a className="paging-link" onClick={ this.handlePrevClick.bind(this) }><i className="fa fa-angle-left"></i> Prev</a>;
      } else {
        return <span className="paging-inactive"><i className="fa fa-angle-left"></i> Prev</span>;
      }
    })();
    const nextLink = (() => {
      if (this.hasNextPage()) {
        return <a className="paging-link" onClick={ this.handleNextClick.bind(this) }>Next <i className="fa fa-angle-right"></i></a>
      } else {
        return <span className="paging-inactive">Next <i className="fa fa-angle-right"></i></span>
      }
    })();
    const lastLink = (() => {
      if (currentPage !== this.getLastPage()) {
        return <a className="paging-link" onClick={ this.handleLastClick.bind(this) }>Last <i className="fa fa-angle-double-right"></i></a>
      } else {
        return <span className="paging-inactive">Last <i className="fa fa-angle-double-right"></i></span>
      }
    })();

    return (
      <div id="page-controller">
        {firstLink}
        {prevLink}
        {nextLink}
        {lastLink}
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentPage: state.pickApp.currentPage,
    perPage    : state.pickApp.perPage,
    total      : state.pickApp.total,
    query      : state.router.location.query,
    currentLocation: state.router.location.pathname
  }
})(Paging);