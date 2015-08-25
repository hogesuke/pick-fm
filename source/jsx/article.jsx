var React = require('react');

var Article = React.createClass({

  render: function () {
    return <div>article tag={this.props.tags}</div>
  }
});

module.exports = Article;