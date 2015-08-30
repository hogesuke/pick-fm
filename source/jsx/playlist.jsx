var React = require('react');
var PubSub = require('pubsub-js');
var _ = require('underscore');

var PlayList = React.createClass({
  getInitialState: function () {
    return {
      articles: []
    };
  },
  componentWillMount: function () {
    PubSub.subscribe('Add-to-playlist', this.add);
  },
  add: function (msg, article) {
    this.setState({ articles: this.state.articles.concat([article]) });
  },
  render: function () {
    var articleDoms = _.map(this.state.articles, function (article) {
      return <div>{article.title},</div>;
    });

    return (
      <div>
        <h3>Play list</h3>
        <div>{articleDoms}</div>
      </div>
    );
  }
});

module.exports = PlayList;
