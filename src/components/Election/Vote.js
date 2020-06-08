import React, {Component} from 'react';
import Web3 from 'web3';
import {Jumbotron,Form,FormGroup,Label,Input,Col,Alert,Button,FormText,Row} from 'reactstrap';
import Election from '../../backend/abis/Election.json';

class Vote extends Component{
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
    const networkData = Election.networks[networkId];
    if(networkData){
      const election = new web3.eth.Contract(Election.abi, networkData.address);
      this.setState({election});
      //const nationalCandidateCount = await election.methods.getNationalCount().call();
      //console.log(nationalCandidateCount);
      //this.setState({nationalCandidateCount});
      //const localCandidateCount = await election.methods.getLocalCount().call({from: this.state.account});
      //this.setState({localCandidateCount});
      const nationalCandidates = await election.methods.getNationalCandidates().call();
      const localCandidates = await election.methods.getLocalCandidates().call({from: this.state.account});
      this.setState({
        nationalCandidates: nationalCandidates,
        localCandidates: localCandidates,
      })
    } else{
      window.alert('Election contract not deployed to detected network');
    }
    
  }

  constructor(props){
    super(props);
    this.state = {
      account: '',
      nationalCandidates: [],
      localCandidates: [],
      /*National States*/
      nationalPositions: ['President','Vice President'],
      nationalCurrentData: [[],[]],
      nationalLimit: [1,1],
      /*Local States*/
      localPositions: ['Mayor'],
      currentData: [[]],
      limit: [1],
      offset: 2,
    }
    this.vote = this.vote.bind(this);
  }

 

  vote(name, nationalVote, localVote){
    //Exposes the solidity backend function
    this.state.election.methods.vote(name,nationalVote,localVote).send({ from: this.state.account });
  }


  render(){
    return (
        <div>
            <Jumbotron className="jumbotron-fluid">
               <div className="container">
                 <h1 className="display-4">Voting</h1>
                 <p className="lead">Exercise your right to vote, and vote wisely!</p>
               </div>
             </Jumbotron>
             <Form className="container"
                onSubmit={(event) => {
                  event.preventDefault()
                  const concat = this.firstName.value + this.lastName.value;
                  const nationalVote = flatten(this.state.nationalCurrentData);
                  const localVote = flatten(this.state.currentData);
                  this.vote(concat,nationalVote,localVote);
             }}>
                <FormGroup>
                  <Label className="h5" for="firstName">Confirm Name</Label>
                  <Row className="px-5">
                  <Input
                    id="firstName"
                    type="text"
                    innerRef={(input) => { this.firstName = input }}
                    className="form-control"
                    placeholder="First Name"
                    required />

                    <Input
                    id="lastName"
                    type="text"
                    innerRef={(input) => { this.lastName = input }}
                    className="form-control"
                    placeholder="Last Name"
                    required />
                  </Row>
                  <FormText color="muted" className="text-center">
                      Enter the name you registered in the sign up tab. Note that you should be in the same account and have the same name credentials to vote. 
                  </FormText>
                </FormGroup>
                <Alert color="secondary">
                  <h4 className="alert-heading">Ballot</h4>
                  <p>
                    There will be a limit on each category of the vote. You would not be able to click more than the limit of a certain position. 
                    In other words: President: 1 vote only, Vice President: 1 vote only, Senator: 12 votes, Mayor: 1 vote, Vice Mayor: 1 vote.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Please double checked who you voted still!
                  </p>
                </Alert>
                {this.state.nationalPositions.map((position, positionId) => {
                  return(
                    <FormGroup tag="fieldset" key={positionId}>
                      <Alert color="info"> <h4 className="alert-heading"> {position} </h4> </Alert>
                      <hr/>
                      { this.state.nationalCandidates.map((candidates, candidateId) => {
                        if((candidates.position) == positionId){
                          return(
                              <Col sm={10} key={candidateId}>
                                <FormGroup check onChange={this.onChange}>
                                  <h5>
                                  <Label check>
                                  <Input
                                    type="checkbox" 
                                    checked={this.state.nationalCurrentData[positionId].indexOf(candidateId)>=0}
                                    onChange={this.nationalSelectData.bind(this,candidateId,positionId)} 
                                    name="select-data-national"/>{candidates.name}
                                    
                                  </Label>

                                  </h5>
                                </FormGroup>
                              </Col>
                          )
                        }
                      })}
                      </FormGroup>
                  )
                })}
                {this.state.localPositions.map((position, positionId) => {
                  return(
                    <FormGroup tag="fieldset" key={positionId}>
                      <Alert color="info"> <h4 className="alert-heading"> {position} </h4> </Alert>
                      <hr/>
                      { this.state.localCandidates.map((candidates, candidateId) => {
                        if((candidates.position-this.state.offset) == positionId){
                          return(
                              <Col sm={10} key={candidateId}>
                                <FormGroup check onChange={this.onChange}>
                                  <h5>
                                  <Label check>
                                  <Input
                                    type="checkbox" 
                                    checked={this.state.currentData[positionId].indexOf(candidateId)>=0}
                                    onChange={this.selectData.bind(this,candidateId,positionId)} 
                                    name="select-data-local"/>{candidates.name}
                                    
                                  </Label>

                                  </h5>
                                </FormGroup>
                              </Col>
                          )
                        }
                      })}
                      </FormGroup>
                  )
                })}
              
              <div class="text-center">
              <Button className="col-4 mx-5" type="submit" color="primary">Vote</Button>
              <FormText color="muted">
                  Once you clicked the Vote Button, you just have to confirm the transaction and you would be have voted already!. 
              </FormText>
            </div>

          </Form>

        </div>
     );
  }

  selectData(candidateId, positionId, event){
    let isSelected = event.currentTarget.checked;
    if(isSelected){
        if(this.state.currentData[positionId].length<this.state.limit[positionId]){
           this.setState({
             currentData : {
               ...this.state.currentData,
               [positionId]:[
                 ...this.state.currentData[positionId],
                 candidateId,
               ]
             }
           })
        }
    }
    else{
       this.setState({
         currentData : {
          ...this.state.currentData,
          [positionId]: this.state.currentData[positionId].filter((item)=>candidateId!==item),
         }
      })
    }
  }

  nationalSelectData(candidateId, positionId, event){
    let isSelected = event.currentTarget.checked;
    if(isSelected){
        if(this.state.nationalCurrentData[positionId].length<this.state.nationalLimit[positionId]){
           this.setState({
             nationalCurrentData : {
               ...this.state.nationalCurrentData,
               [positionId]:[
                 ...this.state.nationalCurrentData[positionId],
                 candidateId,
               ]
             }
           })
        }
    }
    else{
       this.setState({
         nationalCurrentData : {
          ...this.state.nationalCurrentData,
          [positionId]: this.state.nationalCurrentData[positionId].filter((item)=>candidateId!==item),
         }
      })
    }
  }

}

function flatten(array2d){
  const array = [];
  for(let i = 0; i<Object.size(array2d); i++){
    for(let j = 0; j<array2d[i].length; j++){
      array.push(array2d[i][j])
    }
    
  }
  return array;
}

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
 
 
export default Vote;