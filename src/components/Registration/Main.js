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
            <div class="container">
              <h1 class="display-4">Sign Up</h1>
              <p class="lead">Fast and Easy</p>
            </div>
        </Jumbotron>

        <div class="container">
          <Form onSubmit={(event) => {
            event.preventDefault()
            const concat = this.firstName.value + this.lastName.value;
            const address = this.address.value;
            this.props.registerVoter(concat,address)
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
              <Label className="h5" for="address">Location Address</Label>
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
                <option>CAR</option>
                <option>Region II</option>
                <option>Region III</option>
                <option>Region IV-A</option>
                <option>Region IV-B</option>
                <option>Region V</option>
                <option>Region VI</option>
                <option>Region VII</option>
                <option>Region VIII</option>
                <option>Region IX</option>
                <option>Region X</option>
                <option>Region XI</option>
                <option>Region XII</option>
                <option>Region XIII</option>
                <option>ARMM</option>
                </Input>
                </Row>
            </FormGroup>
            <FormGroup>
              <Label className="h5" for="public_address">Public Address</Label>
              <Row className="px-5">
              <Input
                id="public_address"
                type="select"
                innerRef={(input) => { this.voter = input }}
                className="form-control"
                placeholder="Public Key"
                disabled>
                <option>{this.props.account}</option>
              </Input>
                <FormText color="muted">
                  Please check if your Public address is the same with the address in your metamask. If not, kindly refresh the page.
                </FormText>
                </Row>

            </FormGroup>
            <div class="text-center">
              <Button className="col-4 mx-5" type="reset" color="secondary">Clear</Button>
              <Button className="col-4 mx-5" type="submit" color="primary">Register Voter</Button>
              <FormText color="muted">
                  Once you clicked the Register Voter, you just have to confirm the transaction and you would be automatically be registered. 
              </FormText>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Main;
