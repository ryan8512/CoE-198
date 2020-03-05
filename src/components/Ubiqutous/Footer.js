import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Footer = () => {
    return (
      <div>
         <nav class="nav nav-pills justify-content-center flex-column flex-md-row py-5">
             <a class="nav-link active" href="#ninja" data-toggle="tab"> About</a>
             <a class="nav-link" href="#wizard" data-toggle="tab"> Support </a>
             <a class="nav-link" href="#avenger" data-toggle="tab"> Legal </a>
         </nav>
         <div class="tab-content px-5"> 
             <div class="tab-pane active" id="ninja">
               <h3> About </h3>
               <p> This application is aimed to be a prototype to utilize and test a blockchain back-end application. </p>
             </div>
             <div class="tab-pane" id="wizard">
               <h3> Support </h3>
               <p> You can openly contribute to this project on \link </p>
             </div>
             <div class="tab-pane" id="avenger">
               <h3> Legal </h3>
               <p> MIT Open Source License </p>
             </div>
         </div>
      </div>
    );
}
 
export default Footer;