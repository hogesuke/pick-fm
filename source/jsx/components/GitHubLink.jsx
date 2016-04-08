import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class GitHubLink extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleBalloon: false };
  }
  handleMouseOver() {
    this.setState({ visibleBalloon: true });
  }
  handleMouseOut() {
    this.setState({ visibleBalloon: false });
  }
  render() {
    const { visibleBalloon } = this.state;
    const balloon = (
      <div className={ visibleBalloon ? 'balloon' : 'balloon hiding' }>
        <span>Feedback</span>
      </div>
    );

    return (
      <a
        id="github-link"
        href="https://github.com/hogesuke/pick-fm/issues/new"
        target="_blank"
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <i className="fa fa-github"></i>
        { visibleBalloon ? balloon : null }
      </a>
    );
  }
}

export default connect()(GitHubLink);
