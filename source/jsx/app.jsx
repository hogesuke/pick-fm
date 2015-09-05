import React, { Component } from 'react';
import PlayList from './playlist';
import ArticleList from './articlelist';

export default class App extends Component {
  render() {
    return (
      <div>
        <PlayList />
        <ArticleList />
      </div>
    );
  }
}
