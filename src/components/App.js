import React, { Component } from 'react';
import Web3 from 'web3'
import sjcl from 'sjcl'
import './App.css';
import Registration from '../abis/Registration.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

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
    const networkId = await web3.eth.net.getId()
    const networkData = Registration.networks[networkId]
    
    if(networkData) {
      const registration = new web3.eth.Contract(Registration.abi, networkData.address)
      this.setState({ registration })
      
      const voteCount = await registration.methods.voteCount().call()
      console.log(voteCount);
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

    this.registerVoter = this.registerVoter.bind(this)
    //this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  registerVoter(name,pubkey) {
    var bitArray = sjcl.hash.sha256.hash(name);  
    var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
    this.setState({ loading: true })
    this.state.registration.methods.registerVoter(digest_sha256,pubkey).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    window.alert("This is your hash: "+ digest_sha256)
  }

  /*purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.registration.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }*/

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
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
