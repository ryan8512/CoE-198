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
                <option>2fed27a876f80a86beae22d7d931765233309106b1e1af05d4f3fa6b181b5f252fed27a876f80a86beae22d7d931765233309106b1e1af05d4f3fa6b181b5f25</option>
                <option>ac064673fcbca51199f572baa5fcaffa5b5daa5308df78ef471c61044d376519f259c8beaf9ffea5ef96f661a3e845a6f24564bbe5d081039f5975af5c299330</option>
                <option>f987e969d8ecf13de2ffd5819c456456004f7c9aa04f1870178c1dfecf7ea99cf17705131615dd4a2d013231e042f3e5fa64f9c1b969f668cb572b75bebf1f15</option>
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
      </div>
    );
  }
}

export default Main;
