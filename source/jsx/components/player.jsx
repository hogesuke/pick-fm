import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  getAudioUrl() {
    var article = this.props.playingArticle;
    return article.url + '#t=' + article.startTime + ',' + article.endTime;
  }
  render() {
    if (!this.props.playingArticle) {
      return (
        <div>再生するエピソードを選んでください</div>
      );
    }

    return (
      <div>
        <audio className="player" src={this.getAudioUrl()} controls></audio>
      </div>
    );
  }
}

export default connect()(Player);
