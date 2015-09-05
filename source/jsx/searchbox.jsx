import React, { Component } from 'react';

export default class SearchBox extends Component {
  static get propTypes() {
    return {
      handleChange: React.PropTypes.func.isRequired
    };
  }
  _handleChange(event) {
    this.props.handleChange(event.target.value);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this._handleChange.bind(this)} />
      </div>
    );
  }
}
