import React, { Component } from "react";
import PropTypes from 'prop-types';
import Loader from './Loader';
import "./Memo.css";

const playIcon = require('./assets/play.svg');
const stopIcon = require('./assets/stop.svg');

class Memo extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    deleteMemo: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      duration: null,
      playing: false,
      preparing: false,
      canplay: ''
    };
  }

  componentDidMount () {
    if (this.props.data.audio) {
      this.audioEl = document.createElement('audio', {preload: 'auto', type: 'audio/ogg; codec=opus'});
      this.audioEl.addEventListener('loadedmetadata', () => {
        // chrome can show infinity as value for duration
        if (this.audioEl.duration === Infinity) {
          this.audioEl.currentTime = Number.MAX_SAFE_INTEGER;
          this.audioEl.ontimeupdate = () => {
            this.audioEl.ontimeupdate = null;
            this.setState({
              duration: this.audioEl.duration
            });
            this.audioEl.currentTime = 0;
          }
        } else {
          this.setState({
            duration: this.audioEl.duration
          });
        }
      });

      this.audioEl.src = window.URL.createObjectURL(this.props.data.audio);
      this.audioEl.addEventListener('pause', () => {
        this.setState({
          playing: false
        })
      });
      this.audioEl.addEventListener('canplay', () => {
        this.setState({
          canplay: 'Can play'
        });
      });
    }
  }

  deleteMemo = () => {
    if (this.props.deleteMemo) {
      this.props.deleteMemo(this.props.data.date);
    }
  };

  playMemo = () => {
    this.setState({
      preparing: true
    });

    this.audioEl.play()
      .then(() => {
        console.log("Play started", this.props.data.audio.size);
        this.setState({
          playing: true,
          preparing: false
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  stopMemo = () => {
    this.setState({
      playing: false
    }, () => {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
    })
  };

  displayDuration = duration => (duration < 10 ? Math.round(duration * 10) / 10 : Math.round(duration)) + "s";

  renderContent = () => {
    return (
        <div className="Memo__content">
          <span onClick={this.state.playing ? this.stopMemo : this.playMemo}>
            {this.state.preparing ?
              <Loader/> :
              <img className="Memo__button" src={this.state.playing ? stopIcon : playIcon} alt=""/>
            }
          </span>
          <span className="Memo__duration">{this.displayDuration(this.state.duration) + ' ' + this.state.canplay}</span>
        </div>
    );
  };

  render() {
    return (
      <div className="Memo">
        <div className="Memo__title">{this.props.data.date}</div>
          {this.props.data.audio ? this.renderContent() : null}
        <div className="Memo__delete" onClick={this.deleteMemo}/>
      </div>
    );
  }
};

export default Memo;
