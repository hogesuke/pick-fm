var React = require('react');
var PubSub = require('pubsub-js');
var PlayList = require('./playlist');
var ArticleList = require('./articlelist');
var Hoge = require('./hoge');

React.render(
  <div>
    <PlayList />
    <ArticleList />
    <Hoge />
  </div>,
  document.getElementById('content')
);
