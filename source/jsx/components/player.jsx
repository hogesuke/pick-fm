import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class Player extends Component {
  componentDidUpdate() {
    new MediaElementPlayer('.player');
  }
  render() {
    let article = _.last(this.props.playListArticles);

    if (!article) {
      return (
        <div>再生するエピソードを選んでください</div>
      );
    }

    return (
      <div>
        <audio className="player" src={article.url}>hoge</audio>
      </div>
    );
  }
}

export default connect(state => {
  return {
    playListArticles: state.pickApp.playListArticles
  };
})(Player);
