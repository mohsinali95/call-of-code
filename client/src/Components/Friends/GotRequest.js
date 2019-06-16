import React, { Component } from "react";
import "./Friends.css";
import { connect } from 'react-redux';
import { GetUser, checkSession } from '../../store/Actions/action';
import { runprogram, sendFriendRequest, ShowAddFriend, cancelRequest, friendRequests, AcceptRequest } from '../../store/Actions/friendsAction';
import profile_pic from "../../images/profile_pic.jpg";
import AcceptFriendRequest from './AcceptRequest';
class GotRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : '',
      nextprops: '',

    }
  }
  componentWillReceiveProps(next) {
    this.setState({
      nextprops: next.Request_to_me
    })
  }
  componentDidMount() {
    this.props.ischeckSession();
    this.props.isFriendRequests(this.state.currentUserid)

  }
  acceptRequest(receiver_id, sender_id) {
    let obj = {
      sender_id: sender_id,
      receiver_id: receiver_id
    }
    this.props.isAcceptRequest(obj)
  }
  cancelRequest(receiver_id, sender_id) {
    let obj = {
      sender_id: sender_id,
      receiver_id: receiver_id
    }

    this.props.iscancelRequest(obj)
  }
  render() {
    let Request_from_me = [];
    Request_from_me = this.props.Request_from_me;
    let Request_to_me = [];
    Request_to_me = this.props.Request_to_me;
    let users = [];
    users = this.props.users;
    let show_add_friend_request = [];
    show_add_friend_request = this.props.show_add_friend_request;
    return (

      <div className="container-fluid">
      <AcceptFriendRequest/>
        {(Request_from_me) ?
          <div className="row" >
            {Request_from_me.map((val, ind) => {
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
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                      <button
                      onClick={this.acceptRequest.bind(this, val.user_id, this.state.currentUserid)}
                      type="button"
                      className="btn container rounded-0 mx-auto"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">Accept </span>
                    </button>
                    </div>
                      <div className="col-6">
                    <button
                      onClick={this.cancelRequest.bind(this, val.user_id, this.state.currentUserid)}
                      type="button"
                      className="btn container rounded-0 mx-auto"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">Cancel </span>
                    </button>
                  </div>
                  </div>
                  </div>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.root.currentUser,
    show_add_friend_request: state.friendReducerRoot.show_add_friend_request,
    Request_from_me: state.friendReducerRoot.Request_from_me,
    Request_to_me: state.friendReducerRoot.Request_to_me,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isGetUser: () => {
      dispatch(GetUser())
    },
    isAcceptRequest: (obj) => {
      dispatch(AcceptRequest(obj))
    },
    issendFriendRequest: (obj) => {
      dispatch(sendFriendRequest(obj))
    },
    isShowAddFriend: (id) => {
      dispatch(ShowAddFriend(id))
    },
    iscancelRequest: (obj) => {
      dispatch(cancelRequest(obj))
    },
    isrunprogram: (data) => {
      dispatch(runprogram(data))
    },
    isFriendRequests: (data) => {
      dispatch(friendRequests(data))
    },
    ischeckSession: () => {
      dispatch(checkSession())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GotRequest);