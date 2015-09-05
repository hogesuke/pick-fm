import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import _ from 'underscore';

export default class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }
  componentWillMount() {
    PubSub.subscribe('Add-to-playlist', this.add.bind(this));
  }
  add(msg, article) {
    this.setState({ articles: this.state.articles.concat([article]) });
  }
  render() {
    let articleDoms = _.map(this.state.articles, (article) => {
      return <div>{article.title},</div>;
    });

    return (
      <div>
        <h3>Play list</h3>
        <div>{articleDoms}</div>
      </div>
    );
  }
}
