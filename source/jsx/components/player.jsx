import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  render() {
    let article = this.props.playingArticle;

    if (!article) {
      return (
        <div>再生するエピソードを選んでください</div>
      );
    }

    return (
      <div>
        <audio className="player" src={article.url} controls>hoge</audio>
      </div>
    );
  }
}

export default connect()(Player);
