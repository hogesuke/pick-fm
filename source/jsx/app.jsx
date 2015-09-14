import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayList from './playlist';
import SearchBox from './searchbox';
import ArticleList from './articlelist';
import { searchArticles } from './actions'

class App extends Component {
  //render() {
  //  return (
  //    <div>
  //      <PlayList />
  //      <ArticleList />
  //    </div>
  //  );
  //}
  render() {
    return (
      <div>
        <SearchBox onChange={text => this.props.dispatch(searchArticles(text))} />
        <ArticleList />
      </div>
    );
  }
}

export default connect()(App);
