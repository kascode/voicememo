import React, { Component } from "react";
import "./App.css";
import MemoList from "./MemoList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memos: [
        {
          date: new Date(),
          audio: null,
          text: ""
        },
        {
          date: new Date(),
          audio: null,
          text: ""
        },
        {
          date: new Date(),
          audio: null,
          text: ""
        },
        {
          date: new Date(),
          audio: null,
          text: ""
        }
      ]
    };

    this.state.mediaSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

    if (this.state.mediaSupported) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
        })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">memo</h1>
        </header>
        {this.state.mediaSupported ?
          (<div className="App__content">
            <MemoList memos={this.state.memos}/>
          </div>) :
          (<div className="App__error">Media input is not supported by browser</div>)
        }
      </div>
    );
  }
}

export default App;
