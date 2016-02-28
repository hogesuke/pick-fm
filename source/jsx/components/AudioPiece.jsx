import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AudioPiece extends Component {
  getTitle() {
    const { episode } = this.props;
    let type = episode.episode_type.charAt(0).toUpperCase() + episode.episode_type.slice(1);

    type = type === 'Regular' ? '' : ' ' + type;

    return (
      <Link to={this.getEpisodeUrl()}>
        {`${episode.program.name} Episode ${episode.episode_no + type}`}
      </Link>
    );
  }
  getEpisodeUrl() {
    const { episode } = this.props;
    const type = episode.episode_type;
    let url = `/programs/${episode.program.id}/episodes/${episode.episode_no}`;

    if (type !== 'regular') {
      url += `/${type}`;
    }
    return url;
  }
}
