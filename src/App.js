import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakNum: 0,
      sessionNum: 0,
      secondNum: 0
    };
  }

  render() {
    let { breakNum, sessionNum, secondNum } = this.state;
    return (
      <div id="wrapper">
        {/*For All Text & Extra Design*/}
        <section id="ui-wrapper">
          <h1>Ponodoro Clock</h1>
        </section>

        {/* For All Break Section Wrapper */}
        <section id="break-wrapper">
          <button id="break-up">Up</button>
          <h2 id="break-num">{breakNum}</h2>
          <button id="break-down">Down</button>
        </section>

        {/* For All Seesion Section Wrapper */}
        <section id="session-wrapper">
          <button id="session-up">Up</button>
          <h2 id="session-num">{sessionNum}</h2>
          <button id="session-down">Down</button>
        </section>

        {/* For All Timmer Wrapper */}
        <section id="timer-wrapper">
          <h1>Session</h1>
          <span id="minute-num">{sessionNum}</span>
          <span id="colon">:</span>
          <span id="second-num">{secondNum}</span>
        </section>
        
        {/* For All Control Wrapper */}
        <section id="control-wrapper">
          <button id="play">Play</button>
          <button id="reset">Reset</button>
          <button id="pause">Pause</button>
        </section>
      </div>
    );
  }
}

export default App;
