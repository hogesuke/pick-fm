import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Program from '../components/Program';

export default class ProgramList extends React.Component {
  render() {
    let programs = this.props.programs.map((p) => {
      return <Program key={p.id} program={p} />;
    });

    return (
      <div id="program-list">
        {programs}
      </div>
    );
  }
}

export default connect(state => {
  return {
    programs: state.pickApp.programs
  }
})(ProgramList);
