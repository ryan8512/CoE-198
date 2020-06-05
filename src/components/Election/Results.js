import React, {Component} from 'react';
import Web3 from 'web3';
import {Jumbotron,Table,Form,FormGroup,Label,Row,Input,FormText,Button,Alert} from 'reactstrap';
import Results from '../../backend/abis/Results.json';

class Result extends Component{
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
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const networkId = await web3.eth.net.getId();
    const networkData = Results.networks[networkId];
    if(networkData){
      const results = new web3.eth.Contract(Results.abi, networkData.address);
      this.setState({results});
      const winnerName = await results.methods.getWinnerName().call();
      this.setState({winnerName});
      const winnerVotes = await results.methods.getWinnerVotes().call();
      this.setState({winnerVotes});
    }else{
      window.alert('Results contract not deployed to detected network');
    }
  }

  constructor(props){
    super(props);
    this.state = {
      account: '',
      allPositions: ['President','Vice President','Mayor'],
    }
    this.processWinner = this.processWinner.bind(this);
    
  }

  processWinner(district,positions){
    //Exposes the solidity backend function
    this.state.results.methods.processWinnerName(district,positions).send({ from: this.state.account });
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
             <Form className="container"
                onSubmit={(event) => {
                  event.preventDefault();
                  this.processWinner(this.district.value,this.state.allPositions.indexOf(this.position.value))
                }}>
                <FormGroup>
                  <Label className="h5" for="address">District of Candidate</Label>
                  <Row className="px-5">
                  <Input
                    id="address"
                    type="select"
                    innerRef={(input) => { this.district = input }}
                    className="form-control"
                    placeholder="Address"
                    required>
                    <option>NATIONAL</option>
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
                  <Label className="h5" for="address">Position of the Candidate</Label>
                  <Row className="px-5">
                  <Input
                    id="address"
                    type="select"
                    innerRef={(input) => { this.position = input }}
                    className="form-control"
                    placeholder="Address"
                    required>
                    <option>President</option>
                    <option>Vice President</option>
                    <option>Mayor</option>
                    </Input>
                    </Row>
                </FormGroup>
                <div class="text-center">
                  <Button className="col-4 mx-5" type="submit" color="primary">Search </Button>
                  <FormText color="muted">
                      Once you the seach, you have to confirm the transaction to see the results. REFRESH the page to see changes.
                  </FormText>
                </div>
               </Form>
               <hr/>
               <Alert className="container" color="success">
                  <h4 className="alert-heading">Winner Names and Votes</h4>
                  <hr />
                  <p className="mb-0">
                    Only one winner is shown below. One being the most voted individual, even though there can also be other winners.
                  </p>
                </Alert>
             <Table className="container" striped>
              <thead>
                <tr>
                  <th scope="col">Winner Name</th>
                  <th scope="col">Winner Votes</th>
                </tr>
              </thead>
              <tbody id="candidates">
                <tr>
                      <td>{this.state.winnerName}</td>
                      <td>{this.state.winnerVotes}</td>
                </tr>
              </tbody>
             </Table>
        </div>
     );
  }
}

 
export default Result;