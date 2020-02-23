import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Register Voter</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const concat = this.firstName.value + this.lastName.value + this.address.value
          const publicKey = this.voter.value
          this.props.registerVoter(concat,publicKey)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="firstName"
              type="text"
              ref={(input) => { this.firstName = input }}
              className="form-control"
              placeholder="First Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="lastName"
              type="text"
              ref={(input) => { this.lastName = input }}
              className="form-control"
              placeholder="LastName"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="address"
              type="text"
              ref={(input) => { this.address = input }}
              className="form-control"
              placeholder="address"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="voter"
              type="text"
              ref={(input) => { this.voter = input }}
              className="form-control"
              placeholder="Voter Credentials (publicKey)"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Register Voter</button>
        </form>
        <p>&nbsp;</p>
        <h2>Voting List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody id="votinglist">
            { this.props.votinglist.map((voter, key) => {
              return(
                <tr key={key}>
                  <td>{voter.publicKey}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
