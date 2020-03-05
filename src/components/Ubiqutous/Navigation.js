import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink class="navbar-brand" to="/">
                <img src={require("./img/navbar_Logo.jpg")} width="30" height="30" class="d-inline-block align-top" alt=""/>
                Halalan PH
            </NavLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav mr-auto">
                   <NavLink class="nav-item active nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
                   <NavLink class="nav-item nav-link" to="/overview">Overview</NavLink>
                   <NavLink class="nav-item nav-link" to="/support">Support</NavLink>
                   <NavLink class="nav-item nav-link" to="/authors">About Us</NavLink>
               </ul>
            </div>
            <ul class="navbar-nav ml-auto">
                <NavLink class="nav-item nav-link" to="/registration">Sign Up</NavLink>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Login
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Log In</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Digital Signature </label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address"/>
                              </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-link mr-auto">Forgot your password?</button>
                            <button type="button" class="btn btn-primary">Log In</button>
                        </div>
                      </div>
                    </div>
                </div>
            </ul>
          </nav>
       </div>
    );
}
 
export default Navigation;