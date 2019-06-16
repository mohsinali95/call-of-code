import React, { Component } from "react";
import "./Profile.css";
import { Link } from 'react-router-dom';
import { GetProfile, UpdateProfile, userimage ,matchhistory,matchhistorydetail} from '../../store/Actions/profileAction';
import { connect } from 'react-redux';

 class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : null,
      clickCard: false,
      cardId: null,
      matchhistorydetail:[],
      matchhistorydata:[]
    };
    this.onclick_card = this.onclick_card.bind(this);
  }
  componentWillMount(){
    this.props.ismatchhistory(this.state.userid);
    setTimeout(() => {
      this.setState({
        matchhistorydata:this.props.matchhistorydata
      })
    }, 2000);
  }
  onclick_card(data) {
    console.log("data",data);
    this.props.ismatchhistorydetail(data.id);
    setTimeout(() => {
      this.setState({
        clickCard: true,
        cardId: 1,
        matchhistorydetail:this.props.matchhistorydetaildata
        
      });  
    }, 2000);
    
  }


  render() {
    var matchhistory=[];
    matchhistory=this.state.matchhistorydata;
    console.log("matchhistory",matchhistory);
    var matchhistorydetail=[];
    matchhistorydetail=JSON.parse(localStorage.getItem('MATCH_HISTORY'))
    // matchhistorydetail=this.props.matchhistorydetail;
    console.log("matchhistorydetail",matchhistorydetail);
   if (this.state.clickCard == false) {
      return (
        <div>
          {matchhistory.length>0 &&
        <div>
            <p className="display-4 m-0 mt-2">History</p>
            {(matchhistory.map((val,ind)=>{
            return(
              <div key={ind} className="container scroll_auto" style={{ height: "100%" }}>
        
             
              <div className="row mt-3">
                <button
                  class="card hover_pointer m-2"
                  onClick={this.onclick_card.bind(this,val)} 
                  style={{ width: "12rem" }}
                >
                  <div class="card-body">

                    <h5 class="card-title m-auto">{(ind +1)}</h5>
                    <h5 class="card-title m-auto">{val.date}</h5>
                    <h6 class="card-subtitle mb-2 text-muted m-auto">{val.language}</h6>
                    {/* <p class="card-text">Played against "USERNAME"</p> */}
                  </div>
                </button>
              </div>
            </div>
            )
          }))}
         
        </div>
      }
        </div>
      );

    }
 else if (this.state.clickCard == 1  ) {
      return (
        <div>
          {this.state.matchhistorydetail.length>0 &&
          <div>
           
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Players</th>
                <th scope="col">Total Score</th>
                <th scope="col" />
              </tr>
            </thead>
           
            {(this.state.matchhistorydetail.map((val,ind)=>{
              console.log("val",val)
              return(
                <tbody key={ind} >
                <tr >
                <th scope="row">{(ind+ 1)}</th>
                <td>{val.first_name+" "+val.last_name}</td>
                <td>{val.match_score}</td>
                <td>
                  <button
                    type="button"
                    class="btn"
                    data-toggle="collapse"
                    data-target="#p1Details"
                
                  >
                    v
                  </button>
                </td>
              </tr>
             
             
              <tr id="p1Details" class="collapse out">
                <th>Parameter</th>
                <th>Value</th>
                <th>Score</th>
              </tr>
              <tr id="p1Details" class="collapse out">
                <td>Complexity</td>
                <td>{val.complexity}</td>
                <td>{val.score_complexity}</td>
              </tr>
              <tr id="p1Details" class="collapse out">
                <td>PMD</td>
                <td>{val.pmdCount}</td>
                <td>{val.score_smellyCode}</td>
              </tr>
              <tr id="p1Details" class="collapse out">
                <td>Compile Time</td>
                <td>{val.cpuTime}</td>
                <td>{val.score_compileTime}</td>
              </tr>
              {(val.winner_id==val.User_id)?
              <tr id="p1Details" class="collapse out">
                <td>Winner</td>
                <td>1</td>
                <td>{val.match_score}</td>
              </tr>
                :
                <tr id="p1Details" class="collapse out">
                <td>Runner Up</td>
                <td>2</td>
                <td>{val.match_score}</td>
              </tr>
                }
              </tbody>
                )
            }))} 
              
            
          </table>
        </div>
            }  
        
        </div>
      );
    }
  }
}
// matchhistory

const mapStateToProps = (state) => {
  console.log("matchhistorydetail",state.profileReducerRoot.matchhistorydetail)
  return {
    UserProfile: state.profileReducerRoot.profile,
    currentUser: state.root.currentUser,
    matchhistory:state.profileReducerRoot.matchhistory,
    matchhistorydata:state.profileReducerRoot.matchhistory,
    matchhistorydetaildata:state.profileReducerRoot.matchhistorydetail,

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


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);