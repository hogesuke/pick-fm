import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBox extends Component {
  handleChange(event) {
    this.props.onChange(event.target.value);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}

export default connect()(SearchBox);
