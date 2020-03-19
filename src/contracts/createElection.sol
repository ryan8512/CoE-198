pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

import "./voterToken.sol";
import "./Ballot.sol";
contract createElection{
    address owner;
    address[] votingTokenlist;
    mapping(string => address) ballots;
    constructor()public{
        owner = msg.sender;
    }
    /*
    Creation of multiple unique tokens for specific candidate voting
    Only the creator of the election can set tokens
    The createElection Contract is then funded with the tokens
    */
    function createToken (string[] memory _name, 
    string[] memory _symbol, 
    uint256[] memory _totalVote) 
    public returns(uint256[] memory){
        require(msg.sender == owner);
        for(uint i = 0 ;i < _name.length;i++){
            voterToken newToken = new voterToken(_name[i],_symbol[i],_totalVote[i]);
            votingTokenlist.push(address(newToken));
        }
    }
    /*
    Creation of ballots for different districts with different sets of
    Candidates for lower level positions (e.g. Governors,Mayors and etc)
    Only the creator of the election can set ballots
    */
    function createBallot(string memory _location, 
    string[] memory _candidtates,
    address[] memory _address,
    uint256[] memory _positions)public{
        require(msg.sender == owner);
        Ballot newBallot = new Ballot(_location,_candidtates,_address,_positions);
        ballots[_location] = address(newBallot);
    }
    
    
}
