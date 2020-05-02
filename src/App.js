import React from "react";
import "./App.css";


let sessionLength = 25; //For Session Length 

let myInterval; //For Interval Clearer

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakNum: 5,
      sessionNum: 25,
      secondNum: 0,
      secondZero: 0,
      isSession: true,
      disabled: false,
      memory: 0,
      play: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleClick(e) {
    let { breakNum, sessionNum, secondNum, disabled, memory, play, isSession } = this.state;
    let buttonId = e.target.id;
    switch (true) {
      case buttonId === "break-decrement":   
        if (breakNum > 1) {      //break-decreaser
          breakNum -= 1;       
        } else {
          breakNum = breakNum;
        }
        play= !play
        break;
      case buttonId === "break-increment":
        if (breakNum < 60) {
          breakNum += 1;        //break-increaser
        } else {
          breakNum = breakNum;
        }
        play= !play
        break;
      case buttonId === "session-decrement":
        if (sessionNum > 0 && sessionLength > 1) {
          sessionNum -= 1;          //Session-decreaser
          sessionLength -= 1;
        }
        play= !play
        break;
      case buttonId === "session-increment":
        if (sessionNum < 60) {       //Session-Increaser
          sessionNum += 1;
          sessionLength += 1
        }
        play= !play
        break;
      case buttonId === "start_stop":
         if(!play){
          this.countDown();    //Play/Pause Toogle Btn
          play= true
        }
       else if(play){
          this.StopCounter()
          play = false
        }
        disabled = true;
        memory = sessionNum
        break;
      case buttonId === "reset":
        disabled = false;
        secondNum = 0;
        sessionNum = 25;    //Reset Btn
        sessionLength = 25;
        breakNum = 5;
        play = !play
        this.StopCounter();
        break;
    }
    this.setState({ breakNum, sessionNum, secondNum, disabled, memory, play, isSession });
  }

  

  //CountDown Function for Timer
  countDown() {
     myInterval = setInterval(() => {
      let { breakNum, sessionNum, secondNum, disabled, memory, isSession } = this.state;
      if (secondNum > 0) {
        secondNum = secondNum - 1;   //Second CountDown
      }
      else if (secondNum === 0) {
        secondNum= 59               //Second Cycle 
      }
      if(sessionNum >= 0 && secondNum === 59){   //Session Minute CountDown
        sessionNum = sessionNum -1
      }
      
    
      if(isSession && sessionNum===0 && secondNum ===0){   //Break Starter
        sessionNum = breakNum
        isSession = !isSession
      }
      if(!isSession && sessionNum===0 && secondNum ===0){   //Break Ending & Session Starter
        sessionNum = memory;
        isSession = !isSession
      }
      this.setState({ breakNum, sessionNum, secondNum, disabled, memory, isSession });  //Setting the final state
    }, 1000);
  }

StopCounter(){
  clearInterval(myInterval)
}


  render() {
    let { breakNum, sessionNum, secondNum, isSession, disabled, secondZero } = this.state;
    return (
      <div id="wrapper">
        {/*For All Text & Extra Design*/}
        <section id="ui-wrapper">
          <h1 className="title">Pomodoro Clock</h1>
        </section>

        <section className="length-wrapper">
          {/* For All Break Section Wrapper */}
          <h1 id="break-label">Break Length</h1>
        <div id="break-wrapper">
          
          <button disabled={disabled} onClick={this.handleClick} id="break-increment">
            Up
          </button>
          <h2 id="break-length">{breakNum >= 0 && breakNum <= 9?secondZero:''}{breakNum}</h2>
          <button disabled={disabled} onClick={this.handleClick} id="break-decrement">
            Down
          </button>
        </div>

        {/* For All Seesion Section Wrapper */}
        <h1 id="session-label">Session Length</h1>
        <div id="session-wrapper">
          <button
            disabled={disabled}
            onClick={this.handleClick}
            id="session-increment"
          >
            Up
          </button>
          <h2 id="session-length">{sessionLength >= 0 && sessionLength <= 9?secondZero:''}{sessionLength}</h2>
          <button
            disabled={disabled}
            onClick={this.handleClick}
            id="session-decrement"
          >Down
          </button>
          </div>
        </section>

        {/* For All Timmer Wrapper */}
        <section id="timer-wrapper">
          <h1 id="timer-label">{isSession?"Session":"Break"}</h1>
          <span id="time-left">{sessionNum >= 0 && sessionNum <= 9?secondZero:''}{sessionNum}
          :{secondNum >= 0 && secondNum <= 9?secondZero:''}{secondNum}</span>
          {/* As I increase thesessionNum the minute of the timer should Update*/}
          <audio id="beep" src="./beep.mp3"></audio>
        </section>

        {/* For All Control Wrapper */}
        <section id="control-wrapper">
          <button onClick={this.handleClick} id="start_stop">
            Play
          </button>
          <button onClick={this.handleClick} id="reset">
            Reset
          </button>
        </section>
      </div>
    );
  }
}

export default App;
