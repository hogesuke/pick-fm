import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { addComments, removeComment } from '../actions'

class CommentLineBlock extends Component {
  handleMounseOver() {
    const { dispatch, comments } = this.props;
    const MAX_COMMENT_COUNT    = 10;
    const copiedComments       = comments.map((c) => { return Object.assign({}, c); });
    const heartComments        = copiedComments.filter((c) => { return c.comment === ''; });
    const withoutHeartComments = _.reject(copiedComments, (c) => { return c.comment === ''; });
    const visibleComments      = _.shuffle(withoutHeartComments).slice(0, MAX_COMMENT_COUNT);

    if (withoutHeartComments.length > MAX_COMMENT_COUNT) {
      visibleComments.push({
        comment: `他${ withoutHeartComments.length - MAX_COMMENT_COUNT }件...`,
        id: 999999,
        shortened: true
      });
    }

    if (heartComments.length > 0) {
      heartComments[0].comment = 'heart::count::' + heartComments.length;

      if (visibleComments.length > 0 && _.last(visibleComments).shortened) {
        // 省略コメントの前にハートコメントを挿入する
        visibleComments.splice(visibleComments.length - 1, 0, heartComments[0]);
      } else {
        visibleComments.push(heartComments[0]);
      }
    }

    dispatch(addComments(visibleComments, false));
  }
  handleMounseOut() {
    const { dispatch, comments } = this.props;
    _.each([...comments, { id: 999999 }], (c) => {
      dispatch(removeComment(c.id));
    });
  }
  render() {
    const { index, alpha } = this.props;
    return (
      <div
        className="block"
        style={{ left: `${index}%`, opacity: alpha }}
        onMouseOver={this.handleMounseOver.bind(this)}
        onMouseOut={this.handleMounseOut.bind(this)}
      >
      </div>
    );
  }
}

export default connect()(CommentLineBlock);
