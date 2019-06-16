import React, { Component } from "react";
import "./Login.css";
import { connect } from 'react-redux';
import { GetUser, AddUser, LoginUser, checkSession } from '../../store/Actions/action';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginEmail: '',
      LoginPassword: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
    this.Onchange = this.Onchange.bind(this);
    this.LoginBtn = this.LoginBtn.bind(this);
    this.signup = this.signup.bind(this);
  }
  componentWillMount() {
    if (this.props.currentUser) {
      this.props.history.push('/home')
    }
  }
  LoginBtn() {
    let obj = {
      lEmail: this.state.LoginEmail,
      lPassword: this.state.LoginPassword
    }
    console.log("Login history", this.props.history);
    this.props.isLoginUser(obj, this.props.history)
  }

  Onchange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }


  signup() {

    let obj = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }
    console.log("signup history", this.props.history);
    this.props.isAddUser(obj, this.props.history);
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    })
  }
  render() {
    let login_error = [];
    login_error = this.props.login_error
    return (
      <div className="img-full-login p-0">
        <div
          className="col-sm-4 rounded-0 p-0 ml-auto"
          style={{ backgroundColor: "rgb(234,234,234)",  }}
        >
          <div className="p-0">
            <div className="p-4">
              <h1 className="display-4">Login</h1>
              <form>
                <div className="form-group">
                  {login_error != undefined &&
                    login_error.map((val, ind) => {
                      return (
                        <div key={ind}>
                          {val.param == "query_error" && (
                            <p style={{ color: "red" }}>{val.msg}</p>
                          )}
                        </div>
                      );
                    })}
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-sm-4 col-form-label font-weight-bold"
                    >
                      Email
                    </label>
                    <div class="col-sm-8 ml-auto">
                      <input
                        type="email"
                        className="form-control"
                        // id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="example@email.com"
                        name="LoginEmail"
                        onChange={this.Onchange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {login_error != undefined &&
                    login_error.map((val, ind) => {
                      return (
                        <div key={ind}>
                          {val.param == "lEmail" && (
                            <p style={{ color: "red" }}>{val.msg}</p>
                          )}
                        </div>
                      );
                    })}
                </div>

                <div className="form-group">
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-sm-4 col-form-label font-weight-bold"
                    >
                      Password
                    </label>
                    <div class="col-sm-8 ml-auto">
                      <input
                        type="password"
                        className="form-control"
                        // id="exampleInputPassword1"
                        placeholder="Password"
                        name="LoginPassword"
                        onChange={this.Onchange}
                      />
                    </div>
                  </div>
                </div>
                {login_error != undefined &&
                  login_error.map((val, ind) => {
                    return (
                      <div key={ind}>
                        {val.param == "lPassword" && (
                          <p style={{ color: "red" }}>{val.msg}</p>
                        )}
                      </div>
                    );
                  })}
              </form>
            </div>
            <button
              onClick={this.LoginBtn}
              type="submit"
              className="btn btn-primary rounded-0 container m-0"
            >
              Submit
            </button>
          </div>
          <div
            className="p-0 text-light"
            style={{ backgroundColor: "rgb(59,60,55)", height: "100%" }}
          >
            <div className="p-4 pb-auto">
              <h1 className="display-4">Join</h1>
              <form>
                <div className="form-group">
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-sm-4 col-form-label font-weight-bold"
                    >
                      First Name
                    </label>
                    <div class="col-sm-8 ml-auto">
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.Onchange}
                        name="first_name"
                        // id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="John"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-sm-4 col-form-label font-weight-bold"
                    >
                      Last Name
                    </label>
                    <div class="col-sm-8 ml-auto">
                      <input
                        type="text"
                        onChange={this.Onchange}
                        name="last_name"
                        className="form-control"
                        // id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Hammond"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-sm-4 col-form-label font-weight-bold"
                    >
                      Email
                    </label>
                    <div class="col-sm-8 ml-auto">
                      <input
                        type="email"
                        onChange={this.Onchange}
                        name="email"
                        className="form-control"
                        // id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-sm-4 col-form-label font-weight-bold"
                    >
                      Password
                    </label>
                    <div class="col-sm-8 ml-auto">
                      <input
                        type="password"
                        onChange={this.Onchange}
                        name="password"
                        className="form-control"
                        // id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <button
              onClick={this.signup}
              type="submit"
              className="btn btn-info container m-0 rounded-0"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    UserState: state.root.users,
    currentUser: state.root.currentUser,
    login_error: state.root.login_error

    // stateGetItems: state.root.items,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    isAddUser: (obj, history) => {
      dispatch(AddUser(obj, history))
    },
    isLoginUser: (obj, history) => {
      dispatch(LoginUser(obj, history))
    },
    isGetUser: () => {
      dispatch(GetUser())
    },
    ischeckSession: () => {
      dispatch(checkSession())
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
