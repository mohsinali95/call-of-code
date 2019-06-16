import React, { Component } from "react";
import "./Friends.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import profile_pic from "../../images/profile_pic.jpg";
import { GetUser } from '../../store/Actions/action';
import { runprogram, sendFriendRequest, ShowAddFriend } from '../../store/Actions/friendsAction';
import socketIOClient from "socket.io-client";
import AcceptRequest from './AcceptRequest'
// import AcceptModel from '../AcceptModel/AcceptModel';


// userId: this.props.currentUser.id,
class AddFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentUserid: this.props.currentUser.id,
            currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : '',
            server_ip: this.props.server_ip,
            modal: false,
            // sender_name: this.props.currentUser.first_name + " " + this.props.currentUser.last_name,
            // senderImage: (this.props.currentUser.profile_image != null) ? this.props.currentUser.profile_image : '',
            // first_name: this.props.currentUser.first_name,
            // last_name: this.props.currentUser.last_name
            sender_name:  JSON.parse(localStorage.getItem('CurrentUser')).first_name != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).first_name : '' + " " +  JSON.parse(localStorage.getItem('CurrentUser')).last_name != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).last_name : '',
            senderImage: (this.props.currentUser.profile_image != null) ? this.props.currentUser.profile_image : '',
            first_name: JSON.parse(localStorage.getItem('CurrentUser')).first_name != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).first_name : '' ,
            last_name: JSON.parse(localStorage.getItem('CurrentUser')).last_name != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).last_name : '' 

        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillMount() {
        let socket = socketIOClient(this.state.server_ip)
        socket.on("SHOW FRIEND REQUEST", obj => {
            if (this.state.currentUserid == obj.receiver_id) {
                this.toggle();
                console.log("SHOW FRIEND REQUEST obj client ", obj)
            }
        })
    }

    componentDidMount() {
        this.props.isGetUser();
        this.props.isShowAddFriend(this.state.currentUserid);
    }
    sendRequest(id) {
        let obj = {
            sender_id: this.state.currentUserid,
            sender_name: this.state.sender_name,
            senderImage: this.state.senderImage,
            receiver_id: id,
            first_name: this.state.first_name,
            last_name: this.state.last_name

        }
        console.log("obj", obj);
        let socket = socketIOClient(this.state.server_ip, { transports: ['websocket'] })
        console.log("!! this.state.server_ip", this.state.server_ip);
        socket.emit("Friend Request", obj)
        this.props.issendFriendRequest(obj)
    }


    render() {
        let users = [];
        users = this.props.users;
        let show_add_friend_request = [];
        show_add_friend_request = this.props.show_add_friend_request;
        console.log("show_add_friend_request", show_add_friend_request)
        return (

            <div className="container-fluid">
            <AcceptRequest/>
                {(show_add_friend_request) ?
                    <div className="row" >
                        {show_add_friend_request.map((val, ind) => {
                            console.log("Val", val)
                            return (
                                <div key={ind} className="col-sm-3">
                                    <div
                                        className="card hover_pointer m-2  p-0 bg-light text-center"
                                        onClick={this.onclick_card}
                                        style={{ width: "12rem" }}
                                    >
                                        <div class="card-body">
                                            {(val.profile_image != null && val.profile_image != '') ?
                                                <img
                                                    src={`/images/upload_images/${val.email}/${val.profile_image}`}
                                                    alt="profile pic"
                                                    className="w-75"
                                                    style={{ borderRadius: "100%" }}
                                                />
                                                :
                                                <img
                                                    src={profile_pic}
                                                    alt="profile pic"
                                                    className="w-75"
                                                    style={{ borderRadius: "100%" }}
                                                />
                                            }
                                            <h5 className="card-title m-auto">{val.first_name + " " + val.last_name}</h5>
                                        </div>
                                        <button
                                            onClick={this.sendRequest.bind(this, val.user_id)}
                                            type="button"
                                            className="btn container rounded-0 mx-auto"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">Add friend</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        )}

                    </div>
                    :
                    <div>No User Found</div>
                }
            </div>


        );
    }
}


const mapStateToProps = (state) => {
    return {
        server_ip: state.profileReducerRoot.iip,
        currentUser: state.root.currentUser,
        show_add_friend_request: state.friendReducerRoot.show_add_friend_request,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        isGetUser: () => {
            dispatch(GetUser())
        },
        issendFriendRequest: (obj) => {
            dispatch(sendFriendRequest(obj))
        },
        isShowAddFriend: (id) => {
            dispatch(ShowAddFriend(id))
        },
        isrunprogram: (data) => {
            dispatch(runprogram(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);