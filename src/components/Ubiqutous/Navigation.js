import React, {useState} from 'react';
import {
  Collapse,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Navbar,
  Media,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  FormText,
  Input
} from 'reactstrap';

import { Link } from 'react-router-dom';
 
const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const nav_toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);
  const modal_toggle = () => setModal(!modal);

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
                  <NavLink tag={Link} to="/track">Track</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink tag={Link} to="/registration">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                  <Button color="primary" onClick={modal_toggle}> Log In</Button>
              </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Modal isOpen={modal} toggle={modal_toggle}>
            <ModalHeader toggle={modal_toggle}>Login</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label className="h5" for="arbitrary"> Arbitrary Data </Label>
                  <Input
                    id="arbitrary"
                    type="text"
                    className="form-control"
                    placeholder="Any Data"
                    required/>
                </FormGroup>
                <FormGroup>
                  <Label className="h5" for="signature"> Your Signature </Label>
                  <Input
                    id="signature"
                    type="text"
                    className="form-control"
                    placeholder="Digitial Signature"
                    required/>
                <FormText color="muted">
                  A signature is produced by hashing (SHA-256) the arbitrary data you provided
                  and encrypting it with your private key.
                </FormText>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={modal_toggle}>Login</Button>{' '}
              <Button color="secondary" onClick={modal_toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
       </div>
    );
}
 
export default Navigation;