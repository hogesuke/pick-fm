import React, { Component } from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import _ from 'underscore';

export default class PlayList extends React.Component {
  render() {
    let articleDoms = _.map(this.props.playListArticles, (article) => {
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

export default connect(state => {
  return {
    playListArticles: state.pickApp.playListArticles
  }
})(PlayList);
