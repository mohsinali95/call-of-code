import React, { Component } from "react";
import "./Competition.css";
import Navbar from "../Navbar/Navbar";
import Problem from "./Problem";
import Output from "./Output";
import CompNav from "./Comp_Nav";
import editor_pic from "../../images/comp_editor3.jpg";
import problem_pic from "../../images/comp_problem3 (2).jpg";
import output_pic from "../../images/comp_output2.jpg";


import { Breadcrumb, BreadcrumbItem, Card, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Button, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Lobby from '../Lobby/Changer';
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";
import { Redirect } from 'react-router-dom';
import { runprogram } from '../../store/Actions/CompetitionAction';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';



class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickManager: "problem",
      userid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : null,
      first_name: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).first_name : null,
      last_name: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).last_name : null,
      ques: JSON.parse(localStorage.getItem('ques')) != undefined ? JSON.parse(localStorage.getItem('ques')) : null,
      output: this.props.output,
      confirmState: false,
      language: localStorage.getItem('language') != undefined ? localStorage.getItem('language') : null,
      matchId: localStorage.getItem('matchId') != undefined ? localStorage.getItem('matchId') : null,
      totalplayers: localStorage.getItem('totalplayers') != undefined ? localStorage.getItem('totalplayers') : null,
      type: '',
      program: '',
      pageChange: false,
      confirmState1:false
    };

    this.onclick_editor = this.onclick_editor.bind(this);
    this.onclick_output = this.onclick_output.bind(this);
    this.onclick_problem = this.onclick_problem.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.showText = this.showText.bind(this);
    this.showText1 = this.showText1.bind(this);
    this.showModal1 = this.showModal1.bind(this);
    this.closeModal1 = this.closeModal1.bind(this);
    // this.abc = this.abc.bind(this);
  }

  // abc(){
  //   setTimeout(() => {
  //       this.showText1();
  //   }, 30000);
  // }

  showText1(type) {
    let text = this.refs.aceEditor.editor.getValue();
    let lang = ''; 
    if(this.state.language == "java"){
      lang = "java"
    }else if(this.state.language == "C"){
      lang = "rhino"
    }else if(this.state.language == "js"){
      lang = "rhino"
    }
    var program = {
      script: text,
      language: lang,
      versionIndex: "0",
      clientId: "48633bf1e7aa667f621878fd88038424",
      clientSecret: "4c54ad3378fd505be7fa6932bd89eeb210c878018b20238e0e9279ff72ed29c6"
    };

    let arr = [];
    arr.push(program)

    let user = {
      userid: this.state.userid,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      language: this.state.language,
      type: "submit",
      matchId: this.state.matchId,
      totalplayers: this.state.totalplayers
    }

    arr.push(user)
    this.props.isrunprogram(arr);
  
    this.setState({
      program: text,
    })
  }

  showText(type) {
    let text = this.refs.aceEditor.editor.getValue();
    let lang = ''; 
    if(this.state.language == "java"){
      lang = "java"
    }else if(this.state.language == "C"){
      lang = "rhino"
    }else if(this.state.language == "js"){
      lang = "rhino"
    }
    var program = {
      script: text,
      language: lang,
      versionIndex: "0",
      clientId: "48633bf1e7aa667f621878fd88038424",
      clientSecret: "4c54ad3378fd505be7fa6932bd89eeb210c878018b20238e0e9279ff72ed29c6"
    };

    let arr = [];
    arr.push(program)

    let user = {
      userid: this.state.userid,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      language: this.state.language,
      type: type,
      matchId: this.state.matchId,
      totalplayers: this.state.totalplayers
    }

    arr.push(user)
    this.props.isrunprogram(arr);
    if(type=="submit"){

        this.setState({
          pageChange:true
        })
      this.closeModal();
    }
    this.setState({
      program: text,
      // pageChange: true
    })
  }

    
  showModal1() {
    this.setState({
      confirmState1: true
    })

  }

  closeModal() {
    this.setState({
      confirmState: false
    })
  }
  closeModal1() {
    this.setState({
      confirmState1: false
    })
  }

  onclick_editor() {
    this.setState({
      clickManager: "editor"
    });
  }
  onclick_output() {
    this.setState({
      clickManager: "output"
    });
  }
  onclick_problem() {
    this.setState({
      clickManager: "problem"
    });
  }

    componentDidMount(){
      // this.abc();
    }
  render() {

    if(this.state.pageChange == true){
      return <Redirect  to={{
        pathname: "/Changer",
        state: {pageName: "Home"}
      }} />
    }
    
    if (this.state.clickManager == "editor") {
      return (
        <div className="img-full-competition">
          <CompNav />
          <Modal isOpen={this.state.confirmState} className="modal-sm">
          <ModalHeader toggle={this.toggle}>Detail Challenge</ModalHeader>
          <ModalBody>
            <div className="container">
              <FormGroup>
                <Label for="exampleSelectMulti">Are You sure?</Label>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={()=>{ this.setState({type:"Submit"});this.showText()}} >Accept Challenge</Button> */}
            <Button color="primary" onClick={this.showText} >Accept Challenge</Button>
            <Button color="secondary" onClick={this.closeModal.bind(this)} >Reject</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmState1} className="modal-sm">
          <ModalHeader toggle={this.toggle}>Submit Code </ModalHeader>
          <ModalBody>
            <div className="container">
              <FormGroup>
                <Label for="exampleSelectMulti">Are You sure?</Label>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={()=>{ this.setState({type:"Submit"});this.showText()}} >Accept Challenge</Button> */}
            <Button color="primary" onClick={this.showText.bind(this,"submit")} >Yes</Button>
            <Button color="secondary" onClick={this.closeModal1.bind(this)} >No</Button>
          </ModalFooter>
        </Modal>

          <div className="row w-100 p-2  m-0" style={{ height: "85vh" }}>
            <div className="col-3  d-flex flex-column">
              <div
                class="card my-2 hover_pointer w-100 border-0 text-white"
                style={{ width: "18rem" }}
                onClick={this.onclick_editor}
              >
                <img class="card-img" src={editor_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Editor</h5>
                </div>
              </div>

              <div
                class="card my-2 p-0 hover_pointer w-100 border-0 text-white"
                style={{ width: "18rem" }}
                onClick={this.onclick_problem}
              >
                <img class="card-img" src={problem_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Problem</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 text-white border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_output}
              >
                <img class="card-img" src={output_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Output</h5>
                </div>
              </div>
              <div className="mt-auto d-flex flex-row">
                <button 
               onClick={this.showModal1}
                className="btn font-weight-bold submit_color text-light p-3  col-5">
                 <i class="fas fa-check-circle mx-2" />
                  Submit
                </button>
                <button
                  // onClick={this.onclick_output}
                  onClick={this.showText.bind(this,"run")}
                  className="btn font-weight-bold run_color p-3 ml-auto col-5"
                >
                <i class="fas fa-play-circle mx-2"></i>
                  Run
                </button>
              </div>
            </div>

            <div className="col-9  p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                {/* <div>Ace Editor aega yahan</div> */}

                 <AceEditor
                  style={{ width: '100%', height: '100%', }}
                  mode="javascript"
                  theme="github"
                  // onChange={this.onChange}
                  ref="aceEditor"
                  name="UNIQUE-ID"
                  value={this.state.program}
                  editorProps={{
                    $blockScrolling: true
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickManager == "problem") {
      return (
        <div className="img-full-competition">
          <CompNav />
          <div className="row w-100 p-2  m-0" style={{ height: "85vh" }}>
            <div className="col-3  d-flex flex-column">
              <div
                class="card my-2 hover_pointer w-100 border-0 text-white"
                style={{ width: "18rem" }}
                onClick={this.onclick_editor}
              >
                <img class="card-img" src={editor_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Editor</h5>
                </div>
              </div>

              <div
                class="card my-2 p-0 hover_pointer w-100 border-0 text-white"
                style={{ width: "18rem" }}
                onClick={this.onclick_problem}
              >
                <img class="card-img" src={problem_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Problem</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 text-white border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_output}
              >
                <img class="card-img" src={output_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Output</h5>
                </div>
              </div>
              {/* <div className="mt-auto d-flex flex-row">
                <button className="btn font-weight-bold submit_color text-light p-3  col-5">
                 <i class="fas fa-check-circle mx-2" />
                  Submit
                </button>
                <button
                  onClick={this.onclick_output}
                  className="btn font-weight-bold run_color p-3 ml-auto col-5"
                >
                <i class="fas fa-play-circle mx-2"></i>
                  Run
                </button>
              </div> */}
            </div>

            <div className="col-9  p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <Problem />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickManager == "output") {
      return (
        <div className="img-full-competition">
          <CompNav />
          <div className="row w-100 p-2  m-0" style={{ height: "85vh" }}>
            <div className="col-3  d-flex flex-column">
              <div
                class="card my-2 hover_pointer w-100 border-0 text-white"
                style={{ width: "18rem" }}
                onClick={this.onclick_editor}
              >
                <img class="card-img" src={editor_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Editor</h5>
                </div>
              </div>

              <div
                class="card my-2 p-0 hover_pointer w-100 border-0 text-white"
                style={{ width: "18rem" }}
                onClick={this.onclick_problem}
              >
                <img class="card-img" src={problem_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Problem</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 text-white border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_output}
              >
                <img class="card-img" src={output_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Output</h5>
                </div>
              </div>
              {/* <div className="mt-auto d-flex flex-row">
                <button className="btn font-weight-bold submit_color text-light p-3  col-5">
                  <i class="fas fa-check-circle mx-2" />
                  Submit
                </button>
                <button
                  onClick={this.onclick_output}
                  className="btn font-weight-bold run_color p-3 ml-auto col-5"
                >
                <i class="fas fa-play-circle mx-2"></i>
                  Run
                </button>
              </div> */}
            </div>

            <div className="col-9  p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <Output  data={this.props.output}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}




const mapStateToProps = (state) => {
    
  console.log('ques: state.competitionReducer.ques,',state.competitionReducer.ques)
  return {
    server_ip: state.profileReducerRoot.iip,
    currentUser: state.root.currentUser,
    output: state.competitionReducer.output,
    ques: state.competitionReducer.ques,
    show_add_friend_request: state.friendReducerRoot.show_add_friend_request,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isrunprogram: (data) => {
      dispatch(runprogram(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Competition);
// export default Compitition;