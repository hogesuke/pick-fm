import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import Player from './player';
import PlayList from './playlist';
import SearchBox from './searchbox';
import ArticleList from './articlelist';
import { searchArticles, fetchArticles } from '../actions'

class App extends Component {
  render() {
    return (
      <div>
        <Player playingArticle={this.props.playingArticle} />
        <SearchBox onChange={text => this.props.dispatch(fetchArticles(text))} />
        <PlayList />
        <ArticleList onLoad={text => this.props.dispatch(fetchArticles(text))} />
      </div>
    );
  }
}

export default connect(state => {
  return {
    playingArticle: _.last(state.pickApp.playListArticles)
  };
})(App);