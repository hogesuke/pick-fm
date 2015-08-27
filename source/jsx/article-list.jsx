var React = require('react');
var _ = require('underscore');
var SearchBox = require('./searchbox');
var Article = require('./article');

var ArticleList = React.createClass({
  getInitialState: function () {
    return {
      articles: [
        { title: 'title1', tags: ['Docker', 'React'] },
        { title: 'title2', tags: ['Docker', 'Angular'] },
        { title: 'title3', tags: ['Ruby', 'iOS'] },
        { title: 'title4', tags: ['Go', 'iOS'] },
        { title: 'title5', tags: ['Ruby', 'Go'] }
      ],
      searchText: ''
    };
  },
  search: function (text) {
    this.setState({
      searchText: text
    });
  },

  render: function () {
    var that = this;
    var articles = [];

    _.filter(this.state.articles, function (article) {
      return _.filter(article.tags, function (tag) {
        return tag.indexOf(that.state.searchText) !== -1;
      }).length > 0;
    }).forEach(function (article) {
      articles.push(<Article title={article.title} tags={article.tags} />);
    });

    return (
      <div>
        <SearchBox handleChange={this.search} />
        <div>{articles}</div>
      </div>
    );
  }
});

module.exports = ArticleList;
