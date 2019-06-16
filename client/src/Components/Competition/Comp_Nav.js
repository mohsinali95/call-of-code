import React, { Component } from "react";
import "./Competition.css";
import profile_pic from "../../images/profile_pic.jpg";
import { Redirect } from 'react-router-dom';
import Timer from './Timer'
import { Button, Modal, Alert, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
export default class CompNav extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      image:'',
      first_name:'',
      last_name:'',
      confirmState:false,
      redirect:false
    }
    this.closeModal=this.closeModal.bind(this);
    this.showModal=this.showModal.bind(this);
    this.PageChange=this.PageChange.bind(this);
  }
  closeModal() {
    this.setState({
      confirmState: false
    })
  }

  showModal() {
    this.setState({
      confirmState: true
    })
  }
  PageChange() {
    this.setState({
      redirect: true
    })
    this.closeModal();
  }
  componentWillMount(){
    this.setState({
      email:JSON.parse(localStorage.getItem('CurrentUser')).email ,
      image:JSON.parse(localStorage.getItem('CurrentUser')).profile_image != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).profile_image : '',
      first_name:JSON.parse(localStorage.getItem('CurrentUser')).first_name != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).first_name : '',
      last_name:JSON.parse(localStorage.getItem('CurrentUser')).last_name != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).last_name : '',
   
    })
  }
  render() {
    
    if (this.state.redirect==true) {
      return <Redirect push to="/home" />

    }
    return (
      <div>
          <Modal isOpen={this.state.confirmState} className="modal-sm">
          <ModalHeader toggle={this.toggle}>Match Exit</ModalHeader>
          <ModalBody>
            <div className="container">
              <FormGroup>
                <Label for="exampleSelectMulti">Are You sure?</Label>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={()=>{ this.setState({type:"Submit"});this.showText()}} >Accept Challenge</Button> */}
            <Button color="primary" onClick={this.PageChange} >Yes</Button>
            <Button color="secondary" onClick={this.closeModal.bind(this)} >No</Button>
          </ModalFooter>
        </Modal>
        <div
          className="p-0 justify-content-start mr-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <ul class="nav p-0">
            <div
              className="p-1 px-3 rounded row"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <p className="font-weight-bold mx-3 my-auto text-white">
                Playing against
              </p>
              {/* yahan actual player aega */}
              <li class="nav-item d-flex justify-content-center">
                {(this.state.image!="")?
                <img
                src={`/images/upload_images/${this.state.email}/${this.state.image}`}
                alt="profile pic"
                style={{
                  borderRadius: "100%",
                  height: "50px",
                  width: "50px"
                }}
              />
              :
              <img
                  src={profile_pic}
                  alt="profile pic"
                  style={{
                    borderRadius: "100%",
                    height: "50px",
                    width: "50px"
                  }}
                />  
              
                }
                
                <p className="font-weight-bold text-white mx-2 my-auto">
                 {this.state.first_name+ " "+this.state.last_name}
                </p>
              </li>
            </div>
            <div className='ml-auto text-center p-0 row'>
            <p className='font_size_24 text-white font-weight-bold mr-3 my-auto text-light'>Time left</p>
                <p className='font_size_24 text-white font-weight-bold my-auto'><Timer/></p>
            </div>
            <div className="ml-auto">
              <button
                onClick={this.showModal}
              className="btn p-0 hover_exit">
                <li class="nav-item d-flex justify-content-center p-2 ">
                  <span
                    className="fas fa-times-circle mx-2"
                    style={{ fontSize: "34px", color: "red" }}
                  />
                  <p className="my-auto font-weight-bold text-light">
                    Exit Match
                  </p>
                </li>
              </button>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
