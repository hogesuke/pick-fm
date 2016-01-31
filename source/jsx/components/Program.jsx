import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setPlayingTrack } from '../actions'

class Program extends Component {
  render() {
    let { program } = this.props;

    let personalities = program.personalities.map((p) => {
      let name = p.name_ja ? p.name_ja : (p.name_en ? p.name_en : p.nickname);
      return <span>{name}</span>
    });

    return (
      <div className="program" style={{backgroundImage: `url(/img/${program.thumbnail})`}}>
        <Link to={`/programs/${program.id}/episodes`}>
          <div className="description">
            <div className="title">
              {program.name}
            </div>
            <div className="personality">
              {personalities}
            </div>
          </div>
          <div className="overlay">
          </div>
        </Link>
      </div>
    );
  }
}

export default connect()(Program);
