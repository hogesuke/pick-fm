import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class NotFound extends Component {
  render() {
    const { searchText } = this.props;
    const note = (() => {
      if (searchText.length < 2) {
        return '検索ワードは2文字以上入力してください';
      }
      return `"${ searchText }"にヒットするエピソードは見つかりませんでした`;
    })();

    return (
      <div id="not-found">
        <p>{ note }</p>
      </div>
    );
  }
}

export default connect()(NotFound);
