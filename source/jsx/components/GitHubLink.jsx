import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';

class GitHubLink extends Component {
  render() {
    return (
      <a
        id="github-link"
        href="https://github.com/hogesuke/pick-fm"
        target="_blank"
      >
        <i className="fa fa-github"></i>
      </a>
    );
  }
}

export default connect()(GitHubLink);
