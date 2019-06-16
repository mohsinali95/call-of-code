import React, { Component } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { Card, CardTitle, Col, Row } from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import { logout } from '../../../src/store/Actions/action';
import { Myfriends } from '../../../src/store/Actions/friendsAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import AcceptModal from '../Base/AcceptModel/AcceptModel'
import AcceptChallenge from '../Base/AcceptChallenge/AcceptChallenge'
import { CLIENT_RENEG_WINDOW } from 'tls';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: true,
      currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : null,
      server_ip: this.props.server_ip,
      dropdownOpen: false,
      radioSelected: 2,
      state1: false,
      state2: false,
      state3: false,
      state4: false,
      show_online_friends: [],
      redirectReceiver: false,
      modalbox: false,
      challengemodal: false,
      receiver_obj: '',
      Language: ''
    };
    this.setLanguage = this.setLanguage.bind(this);
  }

  modalbox(type) {

    if (type === 'challengemodal') {
      this.setState({
        challengemodal: !this.state.challengemodal
      })
    } else {
      this.setState({
        modalbox: !this.state.modalbox
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

    // socket.on("RECEIVE_CHALLENGE", data => {
    //   console.log("RECEIVE_CHALLENGE", data);
    // })
    socket.on("CHALLENGE_ACCEPTED_RECEIVER", dataa => {
      console.log("CHALLENGE_ACCEPTED_RECEIVER", dataa);
      // if(this.state.currentUserid==dataa.receiver_id){
      if (this.state.currentUserid == dataa.sender_id) {
        this.setState({
          redirectReceiver: true
        })
      }
    })

  }

  logoutUser() {
    this.props.isLogout()
    let socket = socketIOClient(this.state.endpoint)
    socket.emit("USER LOGOUT", this.state.currentUserid)
    localStorage.removeItem('CurrentUser');

  }

  matchFriendModalOpen(obj) {
    this.modalbox('challengemodal');
    this.setState({
      receiver_obj: obj
    })
  }

  matchFriend() {

    this.setState({
      challenge: false
    }, () => {
      setTimeout(() => {
        this.setState({
          challenge: true
        })
      }, 5000);
    })


    let currentuserdata = JSON.parse(localStorage.getItem('CurrentUser'));
    let Challenge_Friend_Data = {
      Sender_name: currentuserdata.first_name + " " + currentuserdata.last_name,
      Sender_image: currentuserdata.profile_image,
      Sender_id: currentuserdata.id,
      Receiver_name: this.state.receiver_obj.user_name,
      Receiver_image: this.state.receiver_obj.profile_image,
      Receiver_id: this.state.receiver_obj.user_id,
      Language: this.state.Language
    }
    localStorage.setItem("language",this.state.Language)
    console.log("match friend", Challenge_Friend_Data);
    this.setState({
      challengemodal: false
    })

    let socket = socketIOClient(this.state.endpoint)
    socket.emit("CHALLENGE_FRIEND", Challenge_Friend_Data)

  }

  setLanguage(e) {
    this.setState({
      Language: e.target.value
    })
  }

  toggleModal(){
    this.setState({
      challengemodal: false
    })
  }

  render() {

    if (this.props.currentUser.isLogin != true) {
      return <Redirect push to="/register" />

    }
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
    // if(online_friends.filter(i => i.user_id)!=this.state.show_online_friends.filter(a=> a.user_id))
    // online_friends=this.state.show_online_friends
    return (
      <div className="animated fadeIn ">
        <button onClick={this.logoutUser.bind(this)} >logout</button>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="demo" onMouseEnter={() => this.setState({ state1: true })} onMouseLeave={() => this.setState({ state1: false })}>
              <div>
                <p style={{ fontSize: '20px', fontFamily: 'Lucida Console' }} className="label-info text-center abc" >{':call of code/>_'}</p>
              </div>
              {(this.state.state1 == false)
                ?
                <div className="chart-wrapper mx-3" style={{ height: '140px' }} >
                  <div style={{ fontSize: '30px' }} className="text-value text-center">Compitition Mode  </div>
                  <div className="text-value text-center">Practice </div>
                </div>
                :
                <div className="chart-wrapper mx-3" style={{ height: '140px' }}>
                  <div>
                    <p>Hover to Change Text</p>
                  </div>
                  <Link to='/Changer'><button className="btn col-5 btn-outline-success mr-2 ml-2">Start</button></Link>
                  <button className="btn col-5 btn-outline-danger ml-2 mr-2">Option 2</button>

                </div>
              }
            </Card>
          </Col>
          {this.state.challengemodal == true &&

            <Modal isOpen={this.state.challengemodal} toggle={this.toggle} className="modal-sm">
              <ModalHeader toggle={this.toggle}>Detail Challenge</ModalHeader>
              <ModalBody>
                <div className="container">
                  <FormGroup>
                    <Label for="exampleSelectMulti">Select Language</Label>
                    <Input type="select" onChange={this.setLanguage} name="selectMulti" id="exampleSelectMulti">
                      <option value="">--Select Language--</option>
                      <option value="java">Java</option>
                      <option value="js">Java Script</option>
                      <option value="C">C</option>
                    </Input>
                  </FormGroup>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.matchFriend.bind(this)}>Accept Challenge</Button>
                <Button color="secondary" onClick={this.toggleModal.bind(this)}>Reject</Button>
              </ModalFooter>
            </Modal>
          }
          <AcceptModal />
          <AcceptChallenge />

          <Col xs="12" sm="6" lg="3">
            <Card className="demo" onMouseEnter={() => this.setState({ state2: true })} onMouseLeave={() => this.setState({ state2: false })}>
              <div>
                <p style={{ fontSize: '20px', fontFamily: 'Lucida Console' }} className="label-info text-center abc" >{':call of code/>_'}</p>

              </div>
              {(this.state.state2 == false)
                ?
                <div className="chart-wrapper mx-3" style={{ height: '140px' }} >

                  <div style={{ fontSize: '30px' }} className="text-value text-center">Compitition Mode  </div>
                  <div className="text-value text-center">One Vs One </div>
                </div>
                :
                <div className="chart-wrapper mx-3" style={{ height: '140px' }}>
                  <div>
                    <p>Hover to Change Text</p>
                  </div>
                  <Link to='/Changer'><button className="btn col-5 btn-outline-success mr-2 ml-2">Start</button></Link>
                  <button className="btn col-5 btn-outline-danger ml-2 mr-2">Option 2</button>

                </div>
              }
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="demo" onMouseEnter={() => this.setState({ state3: true })} onMouseLeave={() => this.setState({ state3: false })}>
              <div>
                <p style={{ fontSize: '20px', fontFamily: 'Lucida Console' }} className="label-info text-center abc" >{':call of code/>_'}</p>

              </div>
              {(this.state.state3 == false)
                ?
                <div className="chart-wrapper mx-3" style={{ height: '140px' }} >

                  <div style={{ fontSize: '30px' }} className="text-value text-center">Compitition Mode  </div>
                  <div className="text-value text-center">With Friends </div>
                </div>
                :
                <div className="chart-wrapper mx-3" style={{ height: '140px' }}>
                  <div>
                    <p>Hover to Change Text</p>
                  </div>
                  <Link to='/Changer'><button className="btn col-5 btn-outline-success mr-2 ml-2">Start</button></Link>
                  <button className="btn col-5 btn-outline-danger ml-2 mr-2">Option 2</button>

                </div>
              }
            </Card>
          </Col>


          <Col xs="12" sm="6" lg="3">
            <Card className="demo" onMouseEnter={() => this.setState({ state4: true })} onMouseLeave={() => this.setState({ state4: false })}>
              <div>
                <p style={{ fontSize: '20px', fontFamily: 'Lucida Console' }} className="label-info text-center abc" >{':call of code/>_'}</p>

              </div>
              {(this.state.state4 == false)
                ?
                <div className="chart-wrapper mx-3" style={{ height: '140px' }} >

                  <div style={{ fontSize: '30px' }} className="text-value text-center">Compitition Mode  </div>
                  <div className="text-value text-center">Tournament </div>
                </div>
                :
                <div className="chart-wrapper mx-3" style={{ height: '140px' }}>
                  <div>
                    <p>Hover to Change Text</p>
                  </div>
                  <Link to='/Changer'><button className="btn col-5 btn-outline-success mr-2 ml-2">Start</button></Link>
                  <button className="btn col-5 btn-outline-danger ml-2 mr-2">Option 2</button>

                </div>
              }
            </Card>
          </Col>
        </Row>
        <Row>
          <h2 className="text-dark">Online Friends</h2>
        </Row>
        <div className="contaier-fluid">

          {(online_friends && online_friends.length > 0) ?

            <div className="row">
              {online_friends.map((val, ind) => {
                return (
                  <div className="col-sm-3" key={ind}>


                    <Card className="bg-light mt-3 smallcard2">
                      <img src={'assets/img/avatars/6.jpg'} style={{ height: '50px', width: '50px', borderRadius: '60px', margin: 'auto' }} alt="abc" />
                      <CardTitle className="mb-0 text-dark text-center">{val.user_name}</CardTitle>
                      <div className="small text-center text-success">Online</div>
                      {(this.state.challenge == true) ?
                        <button className="btn btn-danger" onClick={this.matchFriendModalOpen.bind(this, val)} >Challenge Friend</button>
                        :
                        <button className="btn btn-success"  >Please Wait </button>

                      }
                    </Card>
                  </div>
                )
              })}
            </div>

            :
            <p className="text-dark text-center">
              No Friends Online
         </p>

          }
        </div>
        <Row>
          <h2 className="text-dark">Recent Matches</h2>
        </Row>
        <Row>
          <Col sm="2">
            <Card className="bg-light mt-1">
              <p className="label-info text-center" >Match Details</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Rank :</strong> <em className="text-danger"> 1<sup>st</sup></em> </p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }}><strong>Score:</strong>  80</p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }} ><strong>Difficulty:</strong> Medium</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Date:</strong> 24-07-2018</p>

              <div className="d-inline-block label-danger ">
                <div data-toggle="collapse" data-target="#Wallet" className="butto mr-2 d-inline-block">+</div>
                <p className="font-weight-bold d-inline">Players Detail</p>
              </div>

              <div id="Wallet" className="mt-3 collapse in">
                <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}>Zaid</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Moiz</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Mohsin</p>
              </div>
            </Card>
          </Col>

          <Col sm="2">
            <Card className="bg-light mt-1">
              <p className="label-info text-center" >Match Details</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Rank :</strong> <em className="text-danger"> 1<sup>st</sup></em> </p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }}><strong>Score:</strong>  80</p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }} ><strong>Difficulty:</strong> Medium</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Date:</strong> 24-07-2018</p>

              <div className="d-inline-block label-danger ">
                <div data-toggle="collapse" data-target="#Wallet" className="butto mr-2 d-inline-block">+</div>
                <p className="font-weight-bold d-inline">Players Detail</p>
              </div>

              <div id="Wallet" className="mt-3 collapse in">
                <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}>Zaid</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Moiz</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Mohsin</p>
              </div>
            </Card>
          </Col>

          <Col sm="2">
            <Card className="bg-light mt-1">
              <p className="label-info text-center" >Match Details</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Rank :</strong> <em className="text-danger"> 1<sup>st</sup></em> </p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }}><strong>Score:</strong>  80</p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }} ><strong>Difficulty:</strong> Medium</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Date:</strong> 24-07-2018</p>

              <div className="d-inline-block label-danger ">
                <div data-toggle="collapse" data-target="#Wallet" className="butto mr-2 d-inline-block">+</div>
                <p className="font-weight-bold d-inline">Players Detail</p>
              </div>

              <div id="Wallet" className="mt-3 collapse in">
                <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}>Zaid</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Moiz</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Mohsin</p>
              </div>
            </Card>
          </Col>

          <Col sm="2">
            <Card className="bg-light mt-1">
              <p className="label-info text-center" >Match Details</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Rank :</strong> <em className="text-danger"> 1<sup>st</sup></em> </p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }}><strong>Score:</strong>  80</p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }} ><strong>Difficulty:</strong> Medium</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Date:</strong> 24-07-2018</p>

              <div className="d-inline-block label-danger ">
                <div data-toggle="collapse" data-target="#Wallet" className="butto mr-2 d-inline-block">+</div>
                <p className="font-weight-bold d-inline">Players Detail</p>
              </div>

              <div id="Wallet" className="mt-3 collapse in">
                <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}>Zaid</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Moiz</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Mohsin</p>
              </div>
            </Card>
          </Col>

          <Col sm="2">
            <Card className="bg-light mt-1">
              <p className="label-info text-center" >Match Details</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Rank :</strong> <em className="text-danger"> 1<sup>st</sup></em> </p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }}><strong>Score:</strong>  80</p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }} ><strong>Difficulty:</strong> Medium</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Date:</strong> 24-07-2018</p>

              <div className="d-inline-block label-danger ">
                <div data-toggle="collapse" data-target="#Wallet" className="butto mr-2 d-inline-block">+</div>
                <p className="font-weight-bold d-inline">Players Detail</p>
              </div>

              <div id="Wallet" className="mt-3 collapse in">
                <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}>Zaid</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Moiz</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Mohsin</p>
              </div>
            </Card>
          </Col>


          <Col sm="2">
            <Card className="bg-light mt-1">
              <p className="label-info text-center" >Match Details</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Rank :</strong> <em className="text-danger"> 1<sup>st</sup></em> </p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }}><strong>Score:</strong>  80</p>
              <p className="text-dark  pl-3 " style={{ lineHeight: '3px' }} ><strong>Difficulty:</strong> Medium</p>
              <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}><strong>Date:</strong> 24-07-2018</p>

              <div className="d-inline-block label-danger ">
                <div data-toggle="collapse" data-target="#Wallet" className="butto mr-2 d-inline-block">+</div>
                <p className="font-weight-bold d-inline">Players Detail</p>
              </div>

              <div id="Wallet" className="mt-3 collapse in">
                <p className="text-dark pl-3 " style={{ lineHeight: '3px' }}>Zaid</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Moiz</p>
                <p className="text-dark pl-3" style={{ lineHeight: '3px' }}>Mohsin</p>
              </div>
            </Card>
          </Col>

        </Row>


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
    isLogout: () => {
      dispatch(logout())
    },
    isMyfriends: (id) => {
      dispatch(Myfriends(id))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
