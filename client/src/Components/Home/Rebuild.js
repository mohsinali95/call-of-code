import React, { Component } from "react";
import "./App.css";
import profile_pic from "../../images/profile_pic.jpg";
import { Link } from 'react-router-dom';
import { Button, Modal, Alert, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { Card, CardTitle, Col, Row } from 'reactstrap';
import { Myfriends } from '../../../src/store/Actions/friendsAction';
import { startCompetition } from '../../../src/store/Actions/CompetitionAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";
// import AcceptModal from '../Base/AcceptModel/AcceptModel'
import AcceptChallenge from '../AcceptChallenge/AcceptChallenge'
import { CLIENT_RENEG_WINDOW } from 'tls';
class Rebuild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectLanguageId: 0,
      selectLanguageName: '',
      selectLevelId: 0,
      SelectLevelName: '',
      challenge: true,
      currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : null,
      server_ip: this.props.server_ip,
      dropdownOpen: false,
      radioSelected: 2,
      show_online_friends: [],
      redirectReceiver: false,
      modalbox: false,
      challengemodal: false,
      receiver_obj: 'asa',
      //Language: '',
      currrent_receiver_id: '',
      visible: false,
      languageButton: '',
      difficultButton: ''
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.ChallengeFriend = this.ChallengeFriend.bind(this);
    this.onclick_difficulty = this.onclick_difficulty.bind(this);
    this.LanguageSelect = this.LanguageSelect.bind(this);
    this.matchFriendModalOpen = this.matchFriendModalOpen.bind(this);
  }

  onclick_difficulty(Diff_Id, Diff_Name) {
    this.setState({
      selectLevelId: Diff_Id,
      SelectLevelName: Diff_Name
    })
    if(Diff_Id==1){
      this.setState({
      difficultButton:'easy'})
    }
    if(Diff_Id==2){
      this.setState({
      difficultButton:'medium'})
    }
    if(Diff_Id==3){
      this.setState({
      difficultButton:'hard'})
    }
  }
  LanguageSelect(Lang_Id, Lang_Name) {
    this.setState({
      selectLanguageId: Lang_Id,
      selectLanguageName: Lang_Name
    })

    if(Lang_Id == 1){
      this.setState({
        languageButton: 'js'
      })
    }
    if(Lang_Id == 2){
      this.setState({
        languageButton: 'java'
      })
    }
  }

  
componentWillMount() {
    this.props.isMyfriends(this.state.currentUserid)
    let socket = socketIOClient(this.state.endpoint)
    socket.emit("ONLINE_FRIENDS", this.state.currentUserid)
  }
  componentDidMount() {
    let socket = socketIOClient(this.state.endpoint)
    socket.emit("USER LOGIN", this.state.currentUserid)


    socket.on("SHOW_FRIENDS", data => {
      this.setState({
        show_online_friends: data
      })
    })
    socket.on("CHALLENGE_ACCEPTED_RECEIVER", dataa => {
      console.log('CHALLENGE_ACCEPTED_RECEIVER', dataa)
      if (this.state.currentUserid == dataa.sender_id || this.state.currentUserid == dataa.receiver_id) {
        this.props.isStartCompetition(dataa)
        localStorage.setItem('ques', JSON.stringify(dataa.quesObj))
        localStorage.setItem('matchId', dataa.match_id)
      }
      if (this.state.currentUserid == dataa.sender_id) {
        this.setState({
          redirectReceiver: true
        })
      }
    })

  }

  ChallengeFriend(obj) {
    if (this.state.selectLevelId == 0 && this.state.selectLanguageId == 0) {
      this.setState({
        visible: true
      })
    }
    else if(this.state.selectLevelId != 0 && this.state.selectLanguageId != 0)
    {
      this.matchFriendModalOpen(obj)
    }
  }
  matchFriendModalOpen(obj) {
    console.log("receiver_obj", obj);
    
    this.setState({
      receiver_obj: obj,
      Receiver_name: obj.user_name,
      Receiver_image: obj.profile_image,
      Receiver_id: obj.user_id,
      Receiver_email: obj.email,
    }, () => {

      this.matchFriend();
    })

  }

  matchFriend() {

    this.setState({
      challenge: false,
      currrent_receiver_id: this.state.receiver_obj.user_id,
    }, () => {
      setTimeout(() => {
        this.setState({
          challenge: true,
          currrent_receiver_id: ''
        })
       
      }, 10000);
    })

    let currentuserdata = JSON.parse(localStorage.getItem('CurrentUser'));
    let Challenge_Friend_Data = {
      Sender_name: currentuserdata.first_name + " " + currentuserdata.last_name,
      Sender_image: currentuserdata.profile_image,
      Sender_id: currentuserdata.id,
      Sender_Email: currentuserdata.email,
      Receiver_name: this.state.Receiver_name,
      Receiver_image: this.state.Receiver_image,
      Receiver_id: this.state.Receiver_id,
      Receiver_email: this.state.Receiver_email,
      Language: this.state.selectLanguageName,
      Difficulty:this.state.SelectLevelName,
    }
    localStorage.setItem("language", this.state.selectLanguageName)
    localStorage.setItem("Difficulty", this.state.SelectLevelName)
    console.log("Challenge_Friend_Data", Challenge_Friend_Data);
    let socket = socketIOClient(this.state.endpoint)
    socket.emit("CHALLENGE_FRIEND", Challenge_Friend_Data)

  }
  toggleModal() {
    this.setState({
      challengemodal: false
    })
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    if (this.state.redirectReceiver == true) {
      return <Redirect push to="/Changer" />

    }

    let online_friends = [];
    for (var i = 0; i < this.state.show_online_friends.length; i++) {
      for (var j = 0; j < this.props.Friends.length; j++) {
        if (this.state.show_online_friends[i].user_id == this.props.Friends[j].user_id) {
          online_friends.push(this.props.Friends[j]);
        }
      }
    }

    return (
      <div>
        <center>
          <div style={{ marginTop: '-40px', position: 'absolute', zIndex: 2, width: '100%' }}>
            {this.state.visible == true &&
              <div className="container-fluid">
                <div className="col-4"></div>
                <div className="col-4">
                  <Alert color="dark" isOpen={this.state.visible} toggle={this.onDismiss}>
                    please Select A Language and Difficulty Level
                 </Alert>
                </div>
                <div className="col-4"></div>
              </div>
            }
          </div>
        </center>
        <div className="container-fluid">
          <AcceptChallenge />
          <div className="row">
            <div className="col-6">
              <div>
              <p className="display-4 font-weight-bold font_weight_48">Select Language</p>
                {this.state.languageButton == '' &&
                <div>
                <button className="hover_pointer btn p-0 m-2">
                <div
                  class="card m-0 p-0 text-center border_buttons text-dark py-4"
                  onClick={this.LanguageSelect.bind(this, 1, "js")}
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">
                    <h5 class="card-title m-auto ">JavaScript</h5>
                  </div>
                </div>
              </button>
              <button className="hover_pointer btn p-0 m-2">
                <div
                  class="card m-0 p-0 text-center border_buttons text-dark py-4"
                  onClick={this.LanguageSelect.bind(this, 2, "java")}
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">
                    <h5 class="card-title m-auto">Java</h5>
                  </div>
                </div>
              </button>
              </div>
              
              }
                {this.state.languageButton == 'js' &&
                <div>
                <button className="hover_pointer btn p-0 m-2">
                <div
                  class="card m-0 p-0 text-center bg-dark text-white py-4"
                  onClick={this.LanguageSelect.bind(this, 1, "js")}
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">
                    <h5 class="card-title m-auto ">JavaScript</h5>
                  </div>
                </div>
              </button>
              <button className="hover_pointer btn p-0 m-2">
                <div
                  class="card m-0 p-0 text-center border_buttons text-dark py-4"
                  onClick={this.LanguageSelect.bind(this, 2, "java")}
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">
                    <h5 class="card-title m-auto">Java</h5>
                  </div>
                </div>
              </button>
              </div>
              
              }
                {this.state.languageButton == 'java' &&
                <div>
                <button className="hover_pointer btn p-0 m-2">
                <div
                  class="card m-0 p-0 text-center border_buttons text-dark py-4"
                  onClick={this.LanguageSelect.bind(this, 1, "js")}
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">
                    <h5 class="card-title m-auto ">JavaScript</h5>
                  </div>
                </div>
              </button>
              <button className="hover_pointer btn p-0 m-2">
                <div
                  class="card m-0 p-0 text-center bg-dark text-white py-4"
                  onClick={this.LanguageSelect.bind(this, 2, "java")}
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">
                    <h5 class="card-title m-auto">Java</h5>
                  </div>
                </div>
              </button>
              </div>
              
              }
                
              </div>
              <div className="mt-4">
                <p className="display-4 font-weight-bold font_weight_48">Select Difficulty</p>
                {this.state.difficultButton == '' &&
                <div >
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 1, "Easy")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Easy</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 2, "Medium")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Medium</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 3, "S")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Hard</h5>
                    </div>
                  </div>
                </button>
                </div>
                }
                 {this.state.difficultButton == 'easy' &&
                <div >
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center bg-dark text-light py-4"
                    onClick={this.onclick_difficulty.bind(this, 1, "Easy")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Easy</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 2, "Medium")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Medium</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 3, "S")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Hard</h5>
                    </div>
                  </div>
                </button>
                </div>
                }
                 {this.state.difficultButton == 'medium' &&
                <div >
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 1, "Easy")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Easy</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center bg-dark text-light py-4"
                    onClick={this.onclick_difficulty.bind(this, 2, "Medium")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Medium</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 3, "S")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Hard</h5>
                    </div>
                  </div>
                </button>
                </div>
                }
                 {this.state.difficultButton == 'hard' &&
                <div >
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 1, "Easy")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Easy</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center border_buttons text-dark py-4"
                    onClick={this.onclick_difficulty.bind(this, 2, "Medium")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Medium</h5>
                    </div>
                  </div>
                </button>
                <button className="hover_pointer btn p-0 m-2">
                  <div
                    class="card m-0 p-0 text-center bg-dark text-light py-4"
                    onClick={this.onclick_difficulty.bind(this, 3, "S")}
                    style={{ width: "12rem" }}
                  >
                    <div class="card-body">
                      <h5 class="card-title m-auto">Hard</h5>
                    </div>
                  </div>
                </button>
                </div>
                }
              </div>
            </div>



            <div className="col-6 border-left">
              <p className="display-4">Challenge a friend</p>
              {(online_friends && online_friends.length > 0) ?

                <div className="container_fluid">
                  <div className="row">
                    {online_friends.map((val, ind) => {
                      return (
                        <div key={ind} className="col-4">
                          <div

                            class="card m-0 p-0 bg-light text-center"
                            onClick={this.onclick_card}
                            style={{ width: "12rem" }}
                          >
                            <div class="card-body">
                              <img
                                src={profile_pic}
                                alt="profile pic"
                                className="w-75"
                                style={{ borderRadius: "100%" }}
                              />
                              <h5 class="card-title m-auto">{val.user_name}</h5>
                            </div>
                            {(this.state.challenge == true) ?
                              <button
                                onClick={this.ChallengeFriend.bind(this, val)}
                                type="button"
                                className="btn container rounded-0 mx-auto"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">Challenge</span>
                              </button>
                              :
                              <button
                                type="button"
                                className="btn container rounded-0 mx-auto  btn-success"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">Please Wait</span>
                              </button>
                            }

                          </div>
                        </div>
                      )
                    }
                    )}
                  </div>
                </div>
                :
                <p className="text-dark text-center">
                  No Friends Online
                  </p>

              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    currentUser: state.root.currentUser,
    server_ip: state.profileReducerRoot.iip,
    Friends: state.friendReducerRoot.Friend,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    isMyfriends: (id) => {
      dispatch(Myfriends(id))
    },
    isStartCompetition: (obj) => {
      dispatch(startCompetition(obj))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rebuild);