import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import ProgramList from '../components/ProgramList';

class ProgramListPage extends Component {
  render() {
    return (
      <div>
        <div id="main">
          <div id="tool-bar">
            <SearchBox />
          </div>
          <div id="main-body">
            <ProgramList />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ProgramListPage);
