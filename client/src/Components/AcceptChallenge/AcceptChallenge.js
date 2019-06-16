import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { GetUser } from '../../store/Actions/action';
import { startCompetition } from '../../store/Actions/CompetitionAction';
// import { AcceptRequest } from '../../../store/Actions/friendsAction';
import profile_pic from "../../images/profile_pic.jpg";
import socketIOClient from "socket.io-client";
class AcceptChallenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : '',
            server_ip: this.props.server_ip,
            modal: false,
            Sender_Email:'',
            sender_name: '',
            sender_image: '',
            first_name: '',
            last_name: '',
            sender_id: '',
            receiver_id: '',
            SenderRedirect: false,
            Language: '',
            Difficulty:''

        }
        this.toggle = this.toggle.bind(this);

    }

    shouldComponentUpdate() {
        if (this.state.modal == true) {
            setTimeout(() => {
                this.toggle();
            }, 10000);
            return true;
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        let socket = socketIOClient(this.state.server_ip)
        socket.on("RECEIVE_CHALLENGE", obj => {
            // console.log("RECEIVE_CHALLENGE",obj);
            if (this.state.currentUserid == obj.Receiver_id) {
                this.toggle();
                this.setState({
                    sender_name: obj.Sender_name,
                    Sender_Email:obj.Sender_Email,
                    sender_image:obj.Sender_image,
                    sender_id: obj.Sender_id,
                    receiver_id: obj.Receiver_id,
                    Language: obj.Language,
                    Difficulty:obj.Difficulty
                })
            }
        })
    }

    AcceptRequset() {
        this.toggle();
        let data = {
            sender_id: this.state.sender_id,
            receiver_id: this.state.receiver_id,
            language: this.state.Language,
            Difficulty:this.state.Difficulty
        }
        this.setState({
            SenderRedirect: true
        })
        // this.props.isstartCompetition(data)

        localStorage.setItem('language', this.state.Language)
        localStorage.setItem('Difficulty', this.state.Difficulty)
        console.log("CHALLENGE_ACCEPTED",data);
        let socket = socketIOClient(this.state.server_ip)
        socket.emit("CHALLENGE_ACCEPTED", data)


    }

    render() {
        if (this.state.SenderRedirect == true) {
            return <Redirect push to="/Changer" />
        }
        console.log("Accept Challenge");
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-sm">
                    <ModalHeader toggle={this.toggle}>Challenge Friend</ModalHeader>
                    <ModalBody>
                        <div className="container">

                            <div className="text-center">
                                {(this.state.sender_image != '') ?
                                    <img style={{ height: '100px', width: '100px', marginTop: '0px' }}
                                        src={`/images/upload_images/${this.state.Sender_Email}/${this.state.sender_image}`} className="img-thumbnail " alt="admin@bootstrapmaster.com" />
                                    :
                                    <img style={{ height: '170px', width: '170px', marginTop: '0px' }}
                                        src={profile_pic} className="img-thumbnail" alt="admin@bootstrapmaster.com" />

                                }
                            </div>
                            <div className="text-center">
                                <h3> {this.state.sender_name}</h3>
                                <h4>{this.state.Language}</h4>
                                <h4> {this.state.Difficulty}</h4>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.AcceptRequset.bind(this)}>Accept Challenge</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Reject</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        server_ip: state.profileReducerRoot.iip,
        currentUser: state.root.currentUser,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        isstartCompetition: (data) => {
            dispatch(startCompetition(data))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AcceptChallenge);