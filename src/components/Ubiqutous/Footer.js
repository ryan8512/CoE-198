import React from 'react';
import {Button} from 'reactstrap';
import './App.css'

 
const Footer = () => {
    return (
      <div>
        <hr className="my-3" />
        <footer className="container-fluid text-left">
          <div className="row py-3">
            <div className="col-sm-4 text-center">
              <img src={require("./img/navbar_Logo.jpg")} alt="logo not found"/>
            </div>
            <div className="col-sm-4">
              <div className="short-div"> <h5> Powered By </h5> </div>
              <ul>
                <li> Metamask</li>
                <li> Geth </li>
                <li> Remix</li>
                <li> Amazon Web Services </li>
                <li> NodeJS </li>
                <li> ReactJS</li>
                <li> Truffle Suite </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <div className="short-div"> <h5> More Information</h5> </div>
              <div className="short-div"> Documentation and White Paper </div>
              <Button color="secondary">GitHub</Button>{' '}
              <Button color="secondary">White Paper</Button>{' '}
            </div>
          </div>
          <div className="text-center py-3">
            <h6> Open Source Project; All images are not owned by the authors</h6>
          </div>
          
          
          
        </footer>
    </div>
    );
}
 
export default Footer;