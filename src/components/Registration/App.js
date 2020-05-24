import React, { Component } from 'react';
import Web3 from 'web3'
import sjcl from 'sjcl'
import Registration from '../../backend/abis/Registration.json'
import Main from './Main'
import {Spinner} from 'reactstrap';

class App extends Component {

  //StartUp Function
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //Load Metamask
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //Get Smart Contract Address and NetworkID
    const networkId = await web3.eth.net.getId()
    const networkData = Registration.networks[networkId]
    if(networkData) {
      const registration = new web3.eth.Contract(Registration.abi, networkData.address)
      //Store the registration in the state
      this.setState({ registration })
      //Call method simple read data- check through console if it read
      const voteCount = await registration.methods.voteCount().call()
      console.log(voteCount);
      //Store the votecount in the state
      this.setState({ voteCount })
      // Load votinglist
      for (var i = 0; i <= voteCount; i++) {
        const voter = await registration.methods.votinglist(i).call()
        this.setState({
          votinglist: [...this.state.votinglist, voter]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Registration contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      voteCount: 0,
      votinglist: [],
      loading: true
    }
    //Bind the function
    this.registerVoter = this.registerVoter.bind(this)
  }

  registerVoter(name,pubkey) {
    var bitArray = sjcl.hash.sha256.hash(name);  
    var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
    this.setState({ loading: true })
    //Exposes the solidity backend function
    this.state.registration.methods.registerVoter(digest_sha256,pubkey).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    window.alert("This is your hash: "+ digest_sha256)
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
                  votinglist={this.state.votinglist}
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
