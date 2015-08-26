var React = require('react');

var Article = React.createClass({

  render: function () {
    var tags = [];
    this.props.tags.forEach(function (tag) {
      tags.push(<span>{tag},</span>);
    });

    return (
      <div>
        <div>{this.props.title}</div>
        <div>{tags}</div>
      </div>
    );
  }
});

module.exports = Article;