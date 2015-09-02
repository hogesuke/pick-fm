import React from 'react';
import PubSub from 'pubsub-js';
import _ from 'underscore';
import SearchBox from './searchbox';
import Article from './article';

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        { title: 'title1', tags: ['docker', 'react'] },
        { title: 'title2', tags: ['docker', 'angular'] },
        { title: 'title3', tags: ['ruby', 'ios'] },
        { title: 'title4', tags: ['go', 'ios'] },
        { title: 'title5', tags: ['ruby', 'go'] }
      ],
      searchText: ''
    };
  }
  search(text) {
    this.setState({
      searchText: text
    });
  }
  render() {
    let articles = _.chain(this.state.articles)
      .filter((article) => {
        let hitArticles =  _.filter(article.tags, (tag) => {
          return tag.indexOf(this.state.searchText) !== -1;
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
