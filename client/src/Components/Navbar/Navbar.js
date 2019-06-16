import React, { Component } from "react";
import "./Navbar.css";
import { connect } from 'react-redux';
import socketIO from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import { logout } from '../../store/Actions/action';
import { Link } from 'react-router-dom';
import history from '../History/History';
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.signOut = this.signOut.bind(this);
  }


  signOut() {
    // console.log("signOut ")
    // localStorage.removeItem('CurrentUser')
    // history.push("/");
    // window.location ="/"
    // window.location.reload();
    // let ppp=0;
    // this.props.history.push.length=ppp;
    // console.log("this.props.history",this.props.history.push.length)
    this.props.isLogout(this.props.history,this.props.history.push.length);
  }
  render() {
    return (
      <div>
        <nav
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="navbar navbar-light p-0"
        >
          <div className="mx-auto pt-4 pb-0">
          <Link  to='/home'>
            <button
              type="button"
              className="btn px-5 hover_icon pb-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Home"
            >
           
              <span
                class="fas fa-home p-2 rounded "
                style={{ fontSize: "36px" }}
              />
              <p
                className="font-weight-bold pb-0"
                style={{ color: "#f1f1f1", fontSize: "14px" }}
              >
                Home
              </p>
            </button>
            </Link>
            <Link  to='/Profile'>
            <button
              type="button"
              className="btn px-5 hover_icon pb-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Profile"
            >
              <span
                class="fas fa-user p-2 px-3 rounded"
                style={{ fontSize: "36px" }}
              />
              <p
                className="font-weight-bold pb-0"
                style={{ color: "#f1f1f1", fontSize: "14px" }}
              >
                Profile
              </p>
            </button>
            </Link>
            <Link  to='/Friends'>
            <button
              type="button"
              className="btn px-5 hover_icon pb-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Friends"
            >
              <span
                class="fas fa-users p-2 rounded"
                style={{ fontSize: "36px" }}
              />
              <p
                className="font-weight-bold pb-0"
                style={{ color: "#f1f1f1", fontSize: "14px" }}
              >
                Friends
              </p>
            </button>
            </Link>
          
            <button
              onClick={this.signOut}
              type="button"
              className="btn px-5 hover_icon pb-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Logout"
            >
              <span
                class="fas fa-sign-out-alt p-2 px-3 rounded"
                style={{ fontSize: "36px" }}
              />
              <p
                className="font-weight-bold pb-0"
                style={{ color: "#f1f1f1", fontSize: "14px" }}
              >
                Logout
              </p>
            </button>
           
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    UserState: state.root.users,
    currentUser: state.root.currentUser,
    login_error: state.root.login_error,
    server_ip: state.root.server_ip

    // stateGetItems: state.root.items,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isLogout: (history,da) => {
      dispatch(logout(history,da))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));