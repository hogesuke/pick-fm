import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import _ from 'underscore';

export default class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        'ios', 'docker', 'react',
        'angular', 'go', 'ruby'
      ]
    };
  }
  render() {
    let tagDoms = _.map(this.state.tags, (tag) => {
      return <div onClick={}>{tag}</div>;
    });

    return (
      <div>
        <h3>Tag list</h3>
        <div>{tagDoms}</div>
      </div>
    );
  }
}
