import React, { Component } from 'react';
import Lobby from './Lobby';
import Compitition from '../Competition/Competition';
import history from '../History/History';
import { Redirect } from 'react-router-dom';
import { algo_check } from '../../store/Actions/CompetitionAction';

class Changer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageload: false,
      pageName: '',
      userid: JSON.parse(localStorage.getItem('CurrentUser')).id != undefined ? JSON.parse(localStorage.getItem('CurrentUser')).id : null,
      matchId: localStorage.getItem('matchId') != undefined ? localStorage.getItem('matchId') : null,
      totalplayers: localStorage.getItem('totalplayers') != undefined ? localStorage.getItem('totalplayers') : null
    }
    setTimeout(() => {
      this.setState({
        pageload:true
      })
      if(this.state.matchId > 0){
        let obj = {
          userid: this.state.userid,
          matchId: this.state.matchId,
          totalplayers: this.state.totalplayers
        }
  
        algo_check(obj)
      }
    }, 10000);
  }

  componentWillMount(){
    this.setState({
      pageName:(this.props.location.state) ? this.props.location.state.pageName: ''
    })
  }
  render() {
    
    if(this.state.pageName == "Home"){
      return (
        <div>
              {(this.state.pageload==false)?
              <div>
                <Lobby/>
                </div>
                :
                <Redirect to='/home'  />
            }
        </div>
      );
    }else{
      return (
        <div>
              {(this.state.pageload==false)?
              <div>
                <Lobby/>
                </div>
                :
                <Redirect to='/Compitition'  />
            }
        </div>
      );
    }
  }
  // render() {
  //   return (

  //     <div>
  //       {(this.state.pageload == false) ?
  //         <div>
  //           <Lobby />
  //         </div>
  //         :
  //         <Redirect to='/Compitition' />
  //       }
  //     </div>
  //   );
  // }
}

export default Changer;
