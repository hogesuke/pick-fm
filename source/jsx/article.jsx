import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Article extends Component {
  addToPlayList() {
    PubSub.publish('Add-to-playlist', { title: this.props.title });
  }
  render() {
    let tags = [];
    this.props.tags.forEach((tag) => {
      tags.push(<span>{tag},</span>);
    });

    return (
      <div>
        <div>{this.props.title}</div>
        <div>{tags}</div>
        <div><button onClick={this.addToPlayList.bind(this)}>Add</button></div>
      </div>
    );
  }
}
