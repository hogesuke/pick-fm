var React = require('react');

var Hoge = React.createClass({
  render: () => {
    let fuga = 'FUGA!!!';
    return (
      <div>{fuga}</div>
    );
  }
});

module.exports = Hoge;
