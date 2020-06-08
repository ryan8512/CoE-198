import React, {useState} from 'react';
import {
  Collapse,
  Navbar,
  Media,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { Link } from 'react-router-dom';
 
const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const nav_toggle = () => setIsOpen(!isOpen);

    return (
       <div>
          <Navbar color="navbar-light" light expand="md">
          <Media width="30" height="30" src={require("./img/navbar_Logo.jpg")}/>
            <NavbarBrand href="/">Halalan PH</NavbarBrand>
            <NavbarToggler onClick={nav_toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/overview">Overview</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/support">Support</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/authors">About Us</NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink tag={Link} to="/registration">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} to="/vote"> Vote </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} to="/results"> Results </NavLink>
              </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
       </div>
    );
}
 
export default Navigation;