import React, { Component } from "react";
import "./Profile.css";
import { Link } from 'react-router-dom';
import { GetProfile, UpdateProfile, userimage ,matchhistory,matchhistorydetail,playerstat} from '../../store/Actions/profileAction';
import { connect } from 'react-redux';
class Stats extends Component {
  constructor(props){
    super(props);
    this.state={
      userid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : null,
      playerstat:[]
    }
  }
  componentDidMount(){
    this.props.isplayerstat(this.state.userid)
    setTimeout(() => {
      this.setState({
        playerstat:this.props.playerstat
      })
    }, 2000);
  }
  render() {
    var playerstat=[];
    playerstat=this.state.playerstat
    console.log("playerstat",playerstat)
    return (
      <div>
        {playerstat.length > 0 &&
        
        <div className="container " style={{ height: "100%" }}>
          <p className="display-4 m-0 mt-2">Statistics</p>
          <div className="row ">
            <div className="col-4 border px-auto">
              <p className="font-weight-bold font_size_48 text-center mt-3">
                Level {playerstat[0].level}
              </p>
              <p className="font-weight-bold font_size_24 text-center">
                Total Points {playerstat[0].score}
              </p>
            </div>
            <div className="col-8 border p-4">
              <p className="font_size_18">Matches played</p>
              <p className="font_size_18">{playerstat[0].match_played}</p>
              <p className="font_size_18">Number of Wins</p>
              <p className="font_size_18">{playerstat[0].winner}</p>
            
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("matchhistorydetail",state.profileReducerRoot.matchhistorydetail)
  return {
    UserProfile: state.profileReducerRoot.profile,
    currentUser: state.root.currentUser,
    matchhistory:state.profileReducerRoot.matchhistory,
    matchhistorydata:state.profileReducerRoot.matchhistory,
    matchhistorydetaildata:state.profileReducerRoot.matchhistorydetail,
    playerstat:state.profileReducerRoot.playerstate

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isGetProfile: (id) => {
      dispatch(GetProfile(id))
    },
    isUpdateProfile: (obj) => {
      dispatch(UpdateProfile(obj))
    },
    isuserimage: (data) => {
      dispatch(userimage(data))
    },
    ismatchhistory: (data) => {
      dispatch(matchhistory(data))
    },
    ismatchhistorydetail: (data) => {
      dispatch(matchhistorydetail(data))
    },
    isplayerstat: (data) => {
      dispatch(playerstat(data))
    },


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stats);