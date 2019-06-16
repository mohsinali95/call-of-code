import React, { Component } from "react";
import "./Competition.css";

export default class Stats extends Component {
  constructor(props){
    super(props);
    this.state={
      question:'',
      input:'',
      output:''
    }
  }
    componentWillMount(){
    this.setState({
        question:JSON.parse(localStorage.getItem('ques')).question, 
        input:JSON.parse(localStorage.getItem('ques')).input, 
        output:JSON.parse(localStorage.getItem('ques')).output, 
      })
    }
  
  render() {
    return <div>
      <h1 className="font-weight-bold">Question :</h1>
     <h4>{this.state.question}</h4>
      <h2 className="font-weight-bold">Expected Input : </h2>
       <h3>{this.state.input}</h3> 
      <h2 className="font-weight-bold">Expected Output : </h2>
       <h3>{this.state.output}</h3> 
      </div>;
  }
}
