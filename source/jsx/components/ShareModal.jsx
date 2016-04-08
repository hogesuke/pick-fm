import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { closeShareModal } from '../actions'

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = { hiding: false };
  }
  handleCloseClick() {
    const { dispatch } = this.props;

    this.setState({ hiding: true });

    setTimeout(() => {
      this.setState({ hiding: false });
      dispatch(closeShareModal());
    }, 200);
  }
  render() {
    const { visible } = this.props;
    const { hiding } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <div id='share-modal' className={ hiding ? 'hiding' : 'showing' }>
        <div className='window'>
          <span>hgoehogehoge</span>
        </div>
        <div className='overray' onClick={this.handleCloseClick.bind(this)}></div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    visible: state.pickApp.visibleShareModal
  };
})(ShareModal);
