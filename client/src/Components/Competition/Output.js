import React, { Component } from "react";
import "./Competition.css";

export default class Stats extends Component {
  constructor(props){
    super(props);
    this.state={
      output:this.props.data
    }
  }
  render() {
    return <div>{this.state.output}</div>;
  }
}
