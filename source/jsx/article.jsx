import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addArticleToPlayList } from './actions'

class Article extends Component {
  handleAddToPlayList() {
    this.props.onAddClick(this.props.article);
  }
  render() {
    let tags = [];
    this.props.article.tags.forEach((tag) => {
      tags.push(<span>{tag},</span>);
    });

    return (
      <div>
        <div>{this.props.article.title}</div>
        <div>{tags}</div>
        <div><button onClick={this.handleAddToPlayList.bind(this)}>Add</button></div>
      </div>
    );
  }
}

export default connect()(Article);
