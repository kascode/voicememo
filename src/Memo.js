import React, { Component } from "react";
import "./Memo.css";

class Memo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: null,
      playing: false
    };
  }

  componentDidMount () {
    if (this.props.data.audio) {
      this.audioEl = document.createElement('audio');
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
    }
  }

  render() {
    return (
      <div className="Memo">
        <div className="Memo__title">{this.props.data.date}</div>
        <div className="Memo__content">
          {this.props.data.audio ? <span onClick={() => {
            this.audioEl.play();
          }}>play: {Math.round(this.state.duration * 10) / 10}</span> : null}
        </div>
      </div>
    );
  }
};

export default Memo;
