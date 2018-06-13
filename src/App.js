import React, { Component } from "react";
import "./App.css";
import MemoList from "./MemoList";
import MemoRecorder from "./MemoRecorder";
import Loader from "./Loader";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memos: [],
      mediaSupported: null
    };
  }

  componentDidMount () {
    const mediaSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

    if (mediaSupported) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.setState({
            mediaSupported: true
          });
        })
        .catch(() => {
          this.setState({
            mediaSupported: false
          })
        })
    }
  }

  addMemoRecord = blob => {
    this.setState({
      memos: this.state.memos.concat({
        date: new Date().getTime(),
        audio: blob
      })
    })
  };

  deleteMemo = date => {
    this.setState({
      memos: this.state.memos.filter(memo => memo.date !== date)
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">memo</h1>
        </header>
        {this.state.mediaSupported ?
          (<div className="App__content">
            <MemoList
              memos={this.state.memos}
              deleteMemo={this.deleteMemo}
            />
            <MemoRecorder
              mediaRecorder={this.mediaRecorder}
              onRecorded={this.addMemoRecord}
            />
          </div>) :
          (this.state.mediaSupported === null ? <Loader /> : <div className="App__error">Media input is not supported by browser</div>)
        }
      </div>
    );
  }
}

export default App;
