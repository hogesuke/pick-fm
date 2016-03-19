import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

class CommentLineBlock extends Component {
  render() {
    const { comments, index, alpha } = this.props;
    return (
      <div className="block" style={{ left: `${index}%`, opacity: alpha }}>
      </div>
    );
  }
}

export default connect()(CommentLineBlock);
