import React, { Component } from 'react';
import Web3 from 'web3'
import Registration from '../../backend/abis/Registration.json'
import Main from './Main'
import {Spinner} from 'reactstrap';

class App extends Component {

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
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    //Get Smart Contract Address and NetworkID
    const networkId = await web3.eth.net.getId();
    const networkData = Registration.networks[networkId];
    if(networkData) {
      const registration = new web3.eth.Contract(Registration.abi, networkData.address);
      //Store the registration in the state
      this.setState({ registration });
      this.setState({ loading: false});
    } else {
      window.alert('Registration contract not deployed to detected network.');
    }
    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true
    }
    //Bind the function
    this.registerVoter = this.registerVoter.bind(this)
  }

  registerVoter(name,address) {
    this.setState({ loading: true })
    //Exposes the solidity backend function
    this.state.registration.methods.registerVoter(name,address).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
      window.alert("Please use the same address and name - first and last - when logging in after you confirmed your transaction.");
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-2">
          <div className="row">
            <main role="main" className="col-lg-12">
              { this.state.loading
                ? <div id="loader" className="text-center">
                  <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                </div>
                : <Main
                  account={this.state.account}
                  registerVoter={this.registerVoter}
                 />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
