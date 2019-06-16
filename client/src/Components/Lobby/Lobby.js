import React, { Component } from 'react';
import profile_pic from "../../images/profile_pic.jpg";
import "./Lobby.css";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
class Lobby extends Component {
  render() {
    return (
      <div className="bglobby-image ">
        <div className="container-fluid">
          <div  className="col-1 pull-right text-center ">
         </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="container mt-1 mb-5" style={{backgroundColor:'black',opacity:'0.5'}}>
                <div className="d-inline-block timer-lobby">
                </div>
          <h3 className="text-light d-inline-block" style={{fontSize: '34px'}}>Tips And Convention</h3>
            <p className="text-light" style={{opacity:1}}>
              Use "print()" where you need to print an output in JavaScript.
            </p>
            <div className="mb-5">
             <p className="text-light mt-5 pb-5" style={{opacity:1}}>
              Make separate functions for seperate tasks in the program.
            </p>
             <p className="text-light mt-1 pb-2" style={{opacity:1}}>
              Dont make unneccessary variables and unused code lines.
            </p>
        </div>

          
         

         <div className="container-fluid mt-3 mb-3" style={{backgroundColor:'white',opacity:'0.3'}}>
         </div>
        <div className="container mx-auto ">
              <p className='font-weight-bold text-light text-center' style={{fontSize:'34px'}}>Loading...</p>
            </div>
        </div>

        

      </div>
    );
  }
}

export default Lobby;
