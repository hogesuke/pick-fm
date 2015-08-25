var React = require('react');
var Article = require('./article');

React.render(
  <div>
    <Article tags={['hoge', 'fuga']} />
  </div>,
  document.getElementById('content')
);
