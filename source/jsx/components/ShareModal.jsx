import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { closeShareModal } from '../actions'
import QueryUtil from '../util/QueryUtil'

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {hiding: false, enabledAt: false, checkedAt: true, timeAt: null};
  }
  componentWillReceiveProps(nextProps) {
    const { playingEpisode } = nextProps;
    if (playingEpisode) {
      this.setState({enabledAt: true});
    } else {
      this.setState({enabledAt: false});
    }
  }
  handleCloseClick() {
    const { dispatch } = this.props;

    this.setState({hiding: true});

    setTimeout(() => {
      this.setState({hiding: false, enabledAt: false, checkedAt: true, timeAt: null});
      dispatch(closeShareModal());
    }, 200);
  }
  handleAtToggle() {
    const { checkedAt } = this.state;
    this.setState({checkedAt: !checkedAt});
  }
  handleTimeChange(e) {
    this.setState({timeAt: e.target.value});
  }
  handleUrlInputClick() {
    this.refs.url.select();
  }
  handleTwitterShareClick() {
    const { playingEpisode } = this.props;
    const type = (() => {
      if (playingEpisode === null) { return ''; }
      const t = playingEpisode.episode_type;
      return t === 'regular' ? '' : ' ' + t.charAt(0).toUpperCase() + t.slice(1);
    })();
    const programName = playingEpisode ? playingEpisode.program.name : '';
    const text        = playingEpisode ? `${ programName } Episode ${ playingEpisode.episode_no + type }` : 'pickfm';
    const shareUrl    = this.refs.url.value;
    const twitterUrl  = `https://twitter.com/intent/tweet?text=${ text }&url=${ shareUrl }&hashtags=${ this.getProgramHashTag(programName) + ',' }pickfm`;

    window.open(encodeURI(decodeURI(twitterUrl)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
    return false;
  }
  handleFacebookShareClick() {
    const shareUrl    = /localhost/.test(this.refs.url.value) ? 'pickfm.net' : this.refs.url.value;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

    window.open(encodeURI(decodeURI(facebookUrl)), 'FBwindow', 'width=554, height=470, menubar=no, toolbar=no, scrollbars=yes');
    return false;
  }
  generateUrl() {
    const { playingEpisode, audioCurrentTime, currentLocation, query } = this.props;
    const { checkedAt, timeAt } = this.state;
    const prefix = `${location.protocol}//${location.host}`;

    if (!playingEpisode) {
      const queryString = QueryUtil.toString(query);
      return queryString ? prefix + currentLocation + '?' + queryString : prefix + currentLocation;
    }

    const programId = playingEpisode.program_id;
    const episodeNo = playingEpisode.episode_no;
    const episodeType = playingEpisode.episode_type;
    const timeAtQuery = (() => {
      if (!checkedAt) {
        return null;
      }

      let query = 't=';

      if (timeAt === null) {
        const spilittedTimeAt = this.formatTime(Math.ceil(audioCurrentTime)).split(':');
        if (spilittedTimeAt[0] !== '00') {
          query += parseInt(spilittedTimeAt[0], 10) + 'm';
        }
        return query + parseInt(spilittedTimeAt[1], 10) + 's';
      } else {
        if (!/^[0-9]+:([0-5]?[0-9])$/.test(timeAt)) {
          return query += '0s';
        }

        const spilittedTimeAt = timeAt.split(':');
        if (!/^0+$/.test(spilittedTimeAt[0])) {
          query += parseInt(spilittedTimeAt[0], 10) + 'm';
        }
        return query + parseInt(spilittedTimeAt[1], 10) + 's';
      }
    })();

    let url = `${prefix}/programs/${programId}/episodes/${episodeNo}`;

    if (episodeType !== 'regular') {
      url += `/${episodeType}`
    }
    if (timeAtQuery) {
      url += `?${timeAtQuery}`
    }
    return url;
  }
  getProgramHashTag(programName) {
    return programName.toLowerCase().replace(/\./g, '');
  }
  formatTime(length) {
    if (isNaN(length)) {
      length = 0;
    }
    const min = ('0' + Math.floor(length / 60)).slice(-2);
    const sec = ('0' + length % 60).slice(-2);
    return `${min}:${sec}`;
  }
  render() {
    const { visible, audioCurrentTime } = this.props;
    const { hiding, enabledAt, checkedAt, timeAt } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <div id="share-modal" className={ hiding ? 'hiding' : 'showing' }>
        <div className="window">
          <button className="close-button" onClick={ this.handleCloseClick.bind(this) }>
            <i className="fa fa-times"></i>
          </button>
          <div className="social-buttons">
            <button className="twitter" onClick={ this.handleTwitterShareClick.bind(this) }>
              <i className="fa fa-twitter"></i>
            </button>
            <button className="facebook" onClick={ this.handleFacebookShareClick.bind(this) }>
              <i className="fa fa-facebook-official"></i>
            </button>
          </div>
          <div className="url">
            <input
              type="text"
              ref="url"
              value={ this.generateUrl() }
              onClick={ this.handleUrlInputClick.bind(this) }
              readOnly
            />
          </div>
          <div className="time-at">
            <input
              id="at"
              type="checkbox"
              disabled={ !enabledAt }
              checked={ enabledAt ? checkedAt : false }
              onChange={ this.handleAtToggle.bind(this) }
            />
            <label htmlFor="at">at</label>
            <input
              type="text"
              disabled={ !enabledAt }
              value={ timeAt !== null ? timeAt : this.formatTime(Math.ceil(audioCurrentTime)) }
              onChange={this.handleTimeChange.bind(this)}
            />
          </div>
        </div>
        <div className="overray" onClick={ this.handleCloseClick.bind(this) }></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    visible         : state.pickApp.visibleShareModal,
    playingEpisode  : state.pickApp.playingEpisode,
    audioCurrentTime: state.pickApp.audioCurrentTime,
    currentLocation : state.router.location.pathname,
    query           : state.router.location.query
  };
})(ShareModal);
