import React, { Component } from 'react';
import Web3 from 'web3'
import Registration from '../../abis/Registration.json'

class Track extends Component {

    //StartUp Function
  async componentWillMount() {
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
    //Get Smart Contract Address and NetworkID
    const networkId = await web3.eth.net.getId()
    const networkData = Registration.networks[networkId]
    if(networkData) {
      const registration = new web3.eth.Contract(Registration.abi, networkData.address)
      //Store the registration in the state
      this.setState({ registration })
      //Call method simple read data- check through console if it read
      const voteCount = await registration.methods.voteCount().call()
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
      voteCount: 0,
      votinglist: [],
      loading: true
    }
  }

    render() {
        return (
        <div>
            <h2>Voting List</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody id="votinglist">
                { this.state.votinglist.map((voter, key) => {
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
 
export default Track;