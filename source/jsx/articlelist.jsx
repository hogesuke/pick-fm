import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SEARCH_ARTICLES } from './actions'
import _ from 'underscore';
import SearchBox from './searchbox';
import Article from './article';

export default class ArticleList extends Component {
  // todo たぶんいらない
  //constructor(props) {
  //  super(props);
  //}
  search(text) {
    this.props.dispatch((text) => searchArticles(text));
  }
  render() {
    let articles = _.chain(this.props.articles)
      .filter((article) => {
        let hitArticles =  _.filter(article.tags, (tag) => {
          return tag.indexOf(this.props.searchText) !== -1;
        });
        return hitArticles.length > 0;
      })
      .map((article) => {
        return <Article title={article.title} tags={article.tags} />;
      });

    return (
      <div>
        <SearchBox handleChange={this.search.bind(this)} />
        <div>{articles}</div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    articles  : state.articles,
    searchText: state.searchText
  };
});
