var React = require('react');

var SearchBox = React.createClass({
  propTypes: {
    handleChange: React.PropTypes.func.isRequired
  },
  _handleChange: function (event) {
    this.props.handleChange(event.target.value);
  },
  render: function () {
    return (
      <div>
        <input type="text" onChange={this._handleChange} />
      </div>
    );
  }
});

module.exports = SearchBox;
