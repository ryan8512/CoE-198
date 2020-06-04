import React, {Component} from 'react';
import Web3 from 'web3';
import {Jumbotron,Table} from 'reactstrap';

class Results extends Component{
    //StartUp Function
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //Load Metamask
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    
  }

  render(){
    return (
        <div>
            <Jumbotron className="jumbotron-fluid">
               <div className="container">
                <h1 className="display-4">Results</h1>
                <p className="lead">This results would be available after a day</p>
               </div>
             </Jumbotron>
             <Table className="container" striped>
              <thead>
                <tr>
                  <th scope="col">Region/District</th>
                  <th scope="col">Position</th>
                  <th scope="col">Winner Name</th>
                  <th scope="col">Winner Vote</th>
                </tr>
              </thead>
              <tbody id="candidates">
                { /*this.state.nationalCandidates.map((voter, key) => {
                  return(
                    <tr key={key}>
                      <td>{voter.name}</td>
                      <td>{voter.position}</td>
                    </tr>
                  )
                })}
                { this.state.localCandidates.map((voter, key) => {
                  return(
                    <tr key={key}>
                      <td>{voter.name}</td>
                      <td>{voter.position}</td>
                    </tr>
                  )
                })*/}
              </tbody>
             </Table>
        </div>
     );
  }
}
 
export default Results;