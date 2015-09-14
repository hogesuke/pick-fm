import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Article from './article';

export default class ArticleList extends Component {
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
        <div>{articles}</div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    articles  : state.pickApp.articles,
    searchText: state.pickApp.searchText
  };
})(ArticleList);

