import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateAudio, initPlaying, toggleActiveEpisode } from '../actions'
import CommentLineBlock from './CommentLineBlock';
import _ from 'underscore';

class CommentLine extends Component {
  calcAlpha(count, max, min) {
    if (!max || !min) {
      return 0;
    }

    const upperLimit = max < 10 ? max : 10;
    const percentage = Math.round((upperLimit / max) * 100) / 100;
    const x = Math.round(count * percentage);

    return ((1 / 3) * Math.sqrt(91 * x - 10)) / 10;
  }
  render() {
    const { episode } = this.props;
    const notch = Math.round(episode.time_length / 100);
    const lines = new Array(100);

    episode.comments.map((comment) => {
      const index = Math.round(comment.seconds / notch);
      Array.isArray(lines[index]) ? lines[index].push(comment) : lines[index] = [comment];
    });

    const max = _.max(lines.map((comments) => {
      return comments ? comments.length : null;
    }));
    const min = _.min(lines.map((comments) => {
      return comments ? comments.length : null;
    }));

    const blocks = lines.map((comments, index) => {
      return (
        <CommentLineBlock
          key={index}
          comments={comments}
          index={index}
          alpha={this.calcAlpha(comments.length, max, min)}
        />
      );
    }).filter((block) => {
      return block !== null;
    });

    return(
      <div className="comment-line">
        <div className="block-container">
          {blocks}
        </div>
      </div>
    );

  }
}

export default connect()(CommentLine);
