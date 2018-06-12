import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MemoRecorder.css';

class MemoRecorder extends Component {
  static propTypes = {
    mediaRecorder: PropTypes.object.isRequired,
    onRecorded: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      recording: false
    };

    this.mediaChunks = [];
  }

  componentDidMount () {
    this.props.mediaRecorder.ondataavailable = e => {
      this.mediaChunks.push(e.data);
    };

    this.props.mediaRecorder.onstop = () => {
      if (this.props.onRecorded) {
        const blob = new Blob(this.mediaChunks, { "type": "audio/ogg; codecs=opus" });
        this.props.onRecorded(blob);
      }

      this.mediaChunks = [];
    }
  }

  componentWillUnmount () {
    this.props.mediaRecorder.ondataavailable = null;
    this.props.mediaRecorder.onstop = null;
  }

  onRecordStart = () => {
    this.setState({
      recording: true
    }, this.startRecording);
  };

  onRecordStop = () => {
    this.setState({
      recording: false
    }, this.stopRecording);
  };

  startRecording = () => {
    this.props.mediaRecorder.start();
  };

  stopRecording = () => {
    this.props.mediaRecorder.stop();
  };

  render () {
    return (
      <div className="MemoRecorder">
          <button onClick={this.state.recording ? this.onRecordStop : this.onRecordStart}>
            {this.state.recording ? "Stop" : "Record"}
          </button>
      </div>
    )
  }
}

export default MemoRecorder;
