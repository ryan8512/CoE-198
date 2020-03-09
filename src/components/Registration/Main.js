import React, { Component } from 'react';
import {
  Jumbotron,
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText,
  Row
} from 'reactstrap';

class Main extends Component {

  render() {
    return (
      <div>
        <Jumbotron class="jumbotron-fluid">
            <h1 class="display-4">Sign Up</h1>
            <p class="lead">Fast and Easy</p>
        </Jumbotron>

        <Form onSubmit={(event) => {
          event.preventDefault()
          const concat = this.firstName.value + this.lastName.value + this.address.value
          const publicKey = this.voter.value
          this.props.registerVoter(concat,publicKey)
        }}>
          <FormGroup>
            <Label className="h5" for="firstName">Complete Name</Label>
            <Row className="px-5">
            <Input
              id="firstName"
              type="text"
              innerRef={(input) => { this.firstName = input }}
              className="form-control"
              placeholder="First Name"
              className = "col-6"
              required />

              <Input
              id="lastName"
              type="text"
              innerRef={(input) => { this.lastName = input }}
              className="form-control"
              placeholder="Last Name"
              className = "col-6"
              required />
              </Row>
          </FormGroup>
          <FormGroup>
            <Label className="h5" for="address">Address</Label>
            <Row className="px-5">
            <Input
              id="address"
              type="select"
              innerRef={(input) => { this.address = input }}
              className="form-control"
              placeholder="Address"
              required>
              <option selected>Choose...</option>
              <option>NCR</option>
              <option>Region I</option>
              </Input>
              </Row>
          </FormGroup>
          <FormGroup>
            <Label className="h5" for="public_address">Credentials</Label>
            <Row className="px-5">
            <Input
              id="public_address"
              type="select"
              innerRef={(input) => { this.voter = input }}
              className="form-control"
              placeholder="Public Key"
              required>
              <option selected>Choose...</option>
              <option>{this.props.account}</option>
            </Input>
              <FormText color="muted">
                Please do not forget your private key, or the key provided by Metamask
              </FormText>
              </Row>
              
          </FormGroup>
          <div class="text-center">
            <Button className="col-4 mx-5" type="clear" color="secondary">Clear</Button>
            <Button className="col-4 mx-5" type="submit" color="primary">Register Voter</Button>
          </div>
        </Form>
        
      </div>
    );
  }
}

export default Main;
