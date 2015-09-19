import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Article from './article';
import { addArticleToPlayList } from '../actions'

class ArticleList extends Component {
  render() {
    let articles = _.chain(this.props.articles)
      .filter((article) => {
        let hitArticles =  _.filter(article.tags, (tag) => {
          return tag.indexOf(this.props.searchText) !== -1;
        });
        return hitArticles.length > 0;
      })
      .map((article) => {
        return <Article onAddClick={article => this.props.dispatch(addArticleToPlayList(article))} article={article} />;
      });

    return (
      <div>
        <div style={{margin: "10px 0"}}>{articles}</div>
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

