var React = require('react');

var Article = React.createClass({

  render: function () {
    var tags = [];
    this.props.tags.forEach(function (tag) {
      tags.push(<span>{tag},</span>);
    });

    return (
      <div>
        {tags}
      </div>
    );
  }
});

module.exports = Article;