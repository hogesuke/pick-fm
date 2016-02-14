import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgramList from '../components/ProgramList';

class ProgramListPage extends Component {
  render() {
    return <ProgramList />;
  }
}

export default connect()(ProgramListPage);
