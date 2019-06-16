import React, { Component } from "react";
import "./Friends.css";
import Navbar from "../Navbar/Navbar";
import GotRequest from "./GotRequest";
import SentRequest from "./SentRequest";
import AddFriends from "./AddFriends";
import MyFriends from "./MyFriends";
import profile_pic from "../../images/profile_pic.jpg";
import AcceptRequest from './AcceptRequest'
import friends_pic from '../../images/friends_friends2.jpg'
import sentFriends_pic from '../../images/friends_sentLetter.jpg'
import recieveFriends_pic from '../../images/friends_recieve2.jpg'
import addFriends_pic from '../../images/friends_add_friends2.jpg'

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickManager: "friends",
   };

    this.onclick_friends = this.onclick_friends.bind(this);
    this.onclick_gotRequest = this.onclick_gotRequest.bind(this);
    this.onclick_sentRequest = this.onclick_sentRequest.bind(this);
    this.onclick_AddFriends = this.onclick_AddFriends.bind(this);
  }


 

  onclick_friends() {
    this.setState({
      clickManager: "friends"
    });
  }
  onclick_gotRequest() {
    this.setState({
      clickManager: "gotRequest"
    });
  }
  onclick_sentRequest() {
    this.setState({
      clickManager: "sentRequest"
    });
  }
  onclick_AddFriends() {
    this.setState({
      clickManager: "AddFriends"
    });
  }

  render() {
    
    if (this.state.clickManager == "friends") {
      return (
        <div className="img-full-friends">
          <Navbar />
          {/* <AcceptRequest/> */}
          <div className="row w-100 p-2 m-0" style={{ height: "75vh" }}>
            <div className="col-3 d-flex flex-column">
              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_friends}
              >
               <img class="card-img" src={friends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white"> My Friends</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_sentRequest}
              >
              <img class="card-img" src={sentFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Sent Request</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_gotRequest}
              >
              <img class="card-img" src={recieveFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Recieved Request</h5>
                </div>
              </div>
              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_AddFriends}
              >
              <img class="card-img" src={addFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Add Friends</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <MyFriends />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickManager == "sentRequest") {
      return (
        <div className="img-full-friends">
          <Navbar />
          {/* <AcceptRequest/> */}
          <div className="row w-100 p-2 m-0" style={{ height: "75vh" }}>
            <div className="col-3 d-flex flex-column">
            <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_friends}
              >
               <img class="card-img" src={friends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white"> My Friends</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_sentRequest}
              >
              <img class="card-img" src={sentFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Sent Request</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_gotRequest}
              >
              <img class="card-img" src={recieveFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Recieved Request</h5>
                </div>
              </div>
              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_AddFriends}
              >
              <img class="card-img" src={addFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Add Friends</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <SentRequest />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickManager == "gotRequest") {
      return (
        <div className="img-full-friends">
          <Navbar />
          {/* <AcceptRequest/> */}
          <div className="row w-100 p-2 m-0" style={{ height: "75vh" }}>
            <div className="col-3 d-flex flex-column">
            <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_friends}
              >
               <img class="card-img" src={friends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white"> My Friends</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_sentRequest}
              >
              <img class="card-img" src={sentFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Sent Request</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_gotRequest}
              >
              <img class="card-img" src={recieveFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Recieved Request</h5>
                </div>
              </div>
              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_AddFriends}
              >
              <img class="card-img" src={addFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Add Friends</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <GotRequest />
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.clickManager == "AddFriends") {
      return (
        <div className="img-full-friends">
          <Navbar />
          {/* <AcceptRequest/> */}
          <div className="row w-100 p-2 m-0" style={{ height: "75vh" }}>
            <div className="col-3 d-flex flex-column">
            <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_friends}
              >
               <img class="card-img" src={friends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white"> My Friends</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_sentRequest}
              >
              <img class="card-img" src={sentFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Sent Request</h5>
                </div>
              </div>

              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_gotRequest}
              >
              <img class="card-img" src={recieveFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title">Recieved Request</h5>
                </div>
              </div>
              <div
                class="card my-2 hover_pointer w-100 border-0"
                style={{ width: "18rem" }}
                onClick={this.onclick_AddFriends}
              >
              <img class="card-img" src={addFriends_pic} alt="Card image" />
                <div class="card-body card-img-overlay">
                  <h5 class="card-title text-white">Add Friends</h5>
                </div>
              </div>
            </div>

            <div className="col-9 p-2 bg-dark">
              <div
                className="w-100 rounded bg-white p-2 scroll_auto"
                style={{ height: "100%" }}
              >
                <AddFriends />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
