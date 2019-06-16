import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import profile_pic from "../../images/profile_pic.jpg";
import { GetUser } from '../../store/Actions/action';
// import { AcceptRequest } from '../../../store/Actions/friendsAction';
import socketIOClient from "socket.io-client";
class AcceptRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : '',
            server_ip: this.props.server_ip,
            modal: false,
            receiver_name: '',
            receiver_image: '',
            first_name: '',
            last_name: '',
            sender_id: '',
            receiver_id: '',
            email:'',

        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentWillMount() {
        console.log("componentWillMount", this.state.server_ip)
        let socket = socketIOClient(this.state.server_ip)
        socket.on("SHOW FRIEND REQUEST", obj => {
            if (this.state.currentUserid == obj.receiver_id) {
                this.toggle();
                console.log("SHOW FRIEND REQUEST obj client ", obj)
                this.setState({
                    receiver_name: obj.sender_name,
                    receiver_image: obj.senderImage,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    sender_id: obj.sender_id,
                    receiver_id: obj.receiver_id
                })
            }
        })
    }
    AcceptRequset() {
        this.toggle();
        let data = {
            sender_id: this.state.sender_id,
            receiver_id: this.state.receiver_id
        }
        console.log("accept Request", data)
        let socket = socketIOClient(this.state.server_ip)
        socket.emit("ACCEPT_REQUEST_MODEL", data)
    }
    render() {
        console.log("!!", this.state)
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-sm">
                    <ModalHeader toggle={this.toggle}>Friend Request</ModalHeader>
                    <ModalBody>
                        <div className="container">

                            <div className="text-center">
                                {(this.state.receiver_image != '') ?
                                    <img className="w-75"
                                        style={{ borderRadius: "100%" }}
                                        // src={`/images/upload_images/${this.state.first_name + '_' + this.state.last_name}/${this.state.receiver_image}`}
                                        src={profile_pic}
                                        alt="admin@bootstrapmaster.com" />
                                    :
                                    <img
                                        src={profile_pic}
                                        alt="profile pic"
                                        className="w-75"
                                        style={{ borderRadius: "100%" }}
                                    />
                                }
                            </div>
                            <div className="text-center">
                                <h3> {this.state.receiver_name}</h3>

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.AcceptRequset.bind(this)}>Accept Request</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel Request</Button>
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
// const mapDispatchToProps = (dispatch) => {
//     return {
//         isAcceptRequest: (data) => {
//             dispatch(AcceptRequest(data))
//         }

//     }
// }
export default connect(mapStateToProps, null)(AcceptRequest);