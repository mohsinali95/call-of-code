import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import code_battle from "../../images/code battle.jpg";
import code_battle_sm from "../../images/code battle-sm.jpg";
import surprise from "../../images/surprise.jpg";
import surprise_sm from "../../images/surprise_sm.jpg";
import rapid from "../../images/rapidfire2.jpg";
import rapid_sm from "../../images/rapidfire2_sm.jpg";
import rehabiliation from "../../images/rehabiliation.jpg";
import rehabiliation_sm from "../../images/rehabiliation_sm.jpg";
import Navbar from "../Navbar/Navbar";
import BattleWithCode from "./battleWithCode";
import Surprise from "./Surprise";
import Rapid from "./Rapid";
import Rebuild from "./Rebuild";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag1: 0,
      flag2: 0,
      flag3: 0,
      flag4: 0,
      clickManager: "home"
    };
    this.change_onmouseover1 = this.change_onmouseover1.bind(this);
    this.change_onmouseout1 = this.change_onmouseout1.bind(this);
    this.change_onmouseover2 = this.change_onmouseover2.bind(this);
    this.change_onmouseout2 = this.change_onmouseout2.bind(this);
    this.change_onmouseover3 = this.change_onmouseover3.bind(this);
    this.change_onmouseout3 = this.change_onmouseout3.bind(this);
    this.change_onmouseover4 = this.change_onmouseover4.bind(this);
    this.change_onmouseout4 = this.change_onmouseout4.bind(this);

    this.click_battleWithCode = this.click_battleWithCode.bind(this);
    this.click_surprise = this.click_surprise.bind(this);
    this.click_rapid = this.click_rapid.bind(this);
    this.click_rebuild = this.click_rebuild.bind(this);
    this.click_home = this.click_home.bind(this);
  }

  change_onmouseover1() {
    this.setState({
      flag1: 1
    });
  }
  change_onmouseout1() {
    this.setState({
      flag1: 0
    });
  }
  change_onmouseover2() {
    this.setState({
      flag2: 1
    });
  }
  change_onmouseout2() {
    this.setState({
      flag2: 0
    });
  }
  change_onmouseover3() {
    this.setState({
      flag3: 1
    });
  }
  change_onmouseout3() {
    this.setState({
      flag3: 0
    });
  }
  change_onmouseover4() {
    this.setState({
      flag4: 1
    });
  }
  change_onmouseout4() {
    this.setState({
      flag4: 0
    });
  }

  click_home() {
    this.setState({
      clickManager: "home"
    });
  }
  click_battleWithCode() {
    this.setState({
      clickManager: "battleWithCode"
    });
  }
  click_surprise() {
    this.setState({
      clickManager: "surprise"
    });
  }
  click_rapid() {
    this.setState({
      clickManager: "rapid"
    });
  }
  click_rebuild() {
    this.setState({
      clickManager: "rebuild"
    });
  }
  render() {
    if (this.state.clickManager == "home") {
      return (
        <div className="img-full">
          <Navbar />
          <div className="full-h d-flex align-items-center justify-content-center">
            {this.state.flag1 === 0 ? (
              <div
                className="card trans border-0 text-light m-2 card-height shadow card1_color"
                style={{ width: "18rem" }}
                onMouseOver={this.change_onmouseover1}
              >
                <img
                  className="card-img-top"
                  src={code_battle}
                  alt="Card image cap"
                />
                <div className="card-body to-full">
                  <h5 className="card-title">Battle with Code</h5>
                  <h6 className="card-subtitle mb-2 subtitle_color">
                    Command and Conquer
                  </h6>
                  <p className="card-text font-weight-bold">
                    Battle in the classic mode where you are in command of the
                    different aspects of the competition. Create a scenario and
                    challenge a friend.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="card trans border-0 text-light m-2 card1_color card-open-height shadow-lg"
                style={{ width: "18rem" }}
                onMouseLeave={this.change_onmouseout1}
              >
                <img
                  className="card-img-top"
                  src={code_battle}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Battle with Code</h5>
                  <p className="card-text font-weight-bold">
                    Battle in the classic mode where you are in command of the
                    different aspects of the competition. Create a scenario and
                    challenge a friend.
                  </p>
                </div>
                <a
                  href="#"
                  className="btn text-light font_size font-weight-bold m-0 rounded-0 p-3 container card1_b_color"
                  onClick={this.click_battleWithCode}
                >
                  Start Battle
                </a>
              </div>
            )}
            {this.state.flag2 === 0 ? (
              <div
                className="card trans border-0 text-light m-2 card-height shadow card2_color"
                style={{ width: "18rem" }}
                onMouseOver={this.change_onmouseover2}
              >
                <img
                  className="card-img-top"
                  src={surprise}
                  alt="Card image cap"
                />
                <div className="card-body to-full">
                  <h5 className="card-title">Element of Surprise!</h5>
                  <h6 className="card-subtitle mb-2 subtitle_color">
                    Stay frosty!
                  </h6>
                  <p className="card-text font-weight-bold">
                    Prepare to test your coding skills in a surprise attack
                    where you and your opponent donot know what the competition
                    will be.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="card trans border-0 text-light m-2 card2_color card-open-height shadow-lg"
                style={{ width: "18rem" }}
                onMouseLeave={this.change_onmouseout2}
              >
                <img
                  className="card-img-top"
                  src={surprise}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Element of Surprise!</h5>
                  <p className="card-text font-weight-bold">
                    Prepare to test your coding skills in a surprise attack
                    where you and your opponent donot know what the competition
                    will be.
                  </p>
                </div>
                <a
                  href="#"
                  className="btn text-light font_size font-weight-bold m-0 rounded-0 p-3 container card2_b_color"
                  onClick={this.click_surprise}
                >
                  Start Battle
                </a>
              </div>
            )}
            {this.state.flag3 === 0 ? (
              <div
                className="card trans border-0 text-light m-2 card-height shadow card3_color"
                style={{ width: "18rem" }}
                onMouseOver={this.change_onmouseover3}
              >
                <img
                  className="card-img-top"
                  src={rapid}
                  alt="Card image cap"
                />
                <div className="card-body to-full">
                  <h5 className="card-title">Rapid Fire</h5>
                  <h6 className="card-subtitle mb-2 subtitle_color">
                    Super soldier
                  </h6>
                  <p className="card-text font-weight-bold">
                    A series of quick rounds in which understanding and
                    executing the task is as important as doing it in time.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="card trans border-0 text-light m-2 card3_color card-open-height shadow-lg"
                style={{ width: "18rem" }}
                onMouseLeave={this.change_onmouseout3}
              >
                <img
                  className="card-img-top"
                  src={rapid}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Rapid Fire</h5>
                  <p className="card-text font-weight-bold">
                    A series of quick rounds in which understanding and
                    executing the task is as important as doing it in time.
                  </p>
                </div>
                <a
                  href="#"
                  className="btn text-light font_size font-weight-bold m-0 rounded-0 p-3 container card3_b_color"
                  onClick={this.click_rapid}
                >
                  Start Battle
                </a>
              </div>
            )}
            {this.state.flag4 === 0 ? (
              <div
                className="card trans border-0 text-dark m-2 card-height shadow card4_color"
                style={{ width: "18rem" }}
                onMouseOver={this.change_onmouseover4}
              >
                <img
                  className="card-img-top"
                  src={rehabiliation}
                  alt="Card image cap"
                />
                <div className="card-body to-full">
                  <h5 className="card-title">Rehabiliation</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Rebuild and Restore
                  </h6>
                  <p className="card-text font-weight-bold">
                    Complete the code. A block of code with missing code will be
                    presented, rebuild the missing code and complete the task.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="card trans border-0 text-dark m-2 card4_color card-open-height shadow-lg"
                style={{ width: "18rem" }}
                onMouseLeave={this.change_onmouseout4}
              >
                <img
                  className="card-img-top"
                  src={rehabiliation}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Rehabiliation</h5>
                  <p className="card-text font-weight-bold">
                    Complete the code. A block of code with missing code will be
                    presented, rebuild the missing code and complete the task.
                  </p>
                </div>
                <a
                  href="#"
                  className="btn text-light font_size font-weight-bold m-0 rounded-0 p-3 container card4_b_color"
                  onClick={this.click_rebuild}
                >
                  Start Battle
                </a>
              </div>
            )}
          </div>
        </div>
      );
    } else if (this.state.clickManager == "battleWithCode") {
      return (
        <div  className='img-full-battle'>
          <Navbar />
          <button
            className="btn btn-secondary rounded-0 mb-3"
            onClick={this.click_home}
          >
           <i class="fas fa-long-arrow-alt-left"></i>
          </button>
          <BattleWithCode />
        </div>
      );
    } else if (this.state.clickManager == "surprise") {
      return (
        <div  className='img-full-battle'>
          <Navbar />
          <button
            className="btn btn-secondary rounded-0 mb-3"
            onClick={this.click_home}
          >
           <i class="fas fa-long-arrow-alt-left"></i>
          </button>
          <Surprise />
        </div>
      );
    } else if (this.state.clickManager == "rapid") {
      return (
        <div  className='img-full-battle'>
          <Navbar />
          <button
            className="btn btn-secondary rounded-0 mb-3"
            onClick={this.click_home}
          >
              <i class="fas fa-long-arrow-alt-left"></i>
          </button>
          <Rapid />
        </div>
      );
    } else if (this.state.clickManager == "rebuild") {
      return (
        <div  className='img-full-battle'>
          <Navbar />
          <button
            className="btn btn-secondary rounded-0 mb-3"
            onClick={this.click_home}
          >
             <i class="fas fa-long-arrow-alt-left"></i>
          </button>
          <Rebuild />
        </div>
      );
    }
  }
}

export default App;
