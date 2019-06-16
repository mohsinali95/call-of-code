import React, { Component } from "react";
import "./Friends.css";
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Myfriends,Removefriends} from '../../store/Actions/friendsAction';
// import profile_pic from "../../images/profile_pic.jpg";
import profile_pic from "../../images/profile_pic.jpg";
import AcceptRequest from './AcceptRequest'
class MyFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : '',
    }
  }
  componentWillMount(){
    this.props.isMyfriends(this.state.currentUserid)
   }

   remove_friend(id){
     let obj={
       my_id:this.state.currentUserid,
       remove_friend_id:id
     }
     console.log("remove Friends",obj)
     this.props.isRemovefriends(obj);
   }
  render() {
    var MyFriends=[];
    MyFriends=this.props.MyFriends;
    console.log(Myfriends.length)
    return (

      <div className="container-fluid">
      {/* <AcceptRequest/> */}
         {(MyFriends && MyFriends.length>0) ?
          <div className="row" >
          {MyFriends.map((val, ind) => {
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
                      <h5 className="card-title m-auto">{val.user_name}</h5>
                    </div>
                    <button
                   onClick={this.remove_friend.bind(this, val.user_id)}
                      type="button"
                      className="btn container rounded-0 mx-auto"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">Remove Friend</span>
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
    )
  }
}

const mapStateToProps = (state) => {
    return {
      server_ip: state.profileReducerRoot.iip,
      currentUser: state.root.currentUser,
      MyFriends: state.friendReducerRoot.MyFriends,
  
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
     isMyfriends: (id) => {
        dispatch(Myfriends(id))
      },
     isRemovefriends: (data) => {
        dispatch(Removefriends(data))
      },
     }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyFriends);
