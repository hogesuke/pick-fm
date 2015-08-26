var React = require('react');
var Article = require('./article');

var ArticleList = React.createClass({
  getInitialState: function () {
    return {
      articles: [
        { title: 'title1', tags: ['Docker', 'React'] },
        { title: 'title2', tags: ['Docker', 'Angular'] },
        { title: 'title3', tags: ['Ruby', 'iOS'] },
        { title: 'title4', tags: ['Go', 'Android'] },
        { title: 'title5', tags: ['Google', 'Apple'] }
      ]
    };
  },

  render: function () {
    var articles = [];
    this.state.articles.forEach(function (article) {
      articles.push(<Article title={article.title} tags={article.tags} />);
    });

    return (
      <div>{articles}</div>
    );
  }
});

module.exports = ArticleList;
