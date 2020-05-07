//pragma solidity ^0.5.0;
pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

import "./voterToken.sol";
import "./SetupBlockchain.sol";
import "./Ballot.sol";

contract Registration{
    string public name;
    address private regAdmin;
    uint public timelimit;
    SetupBlockchain setup;
    struct voter{
        string uniqueID;
        bool canVote;
        string district;
    }
    
    
    mapping(address => voter) registeredVoters;
    
    constructor() public{
        name = "Registration Blockchain";
        timelimit = now + 86400;
        regAdmin = msg.sender;
    }
    function registerVoter(string memory _uniqueID,string memory _district) public{
        require((bytes(registeredVoters[msg.sender].uniqueID)).length == 0, "Voter already registered!");
        require(registeredVoters[msg.sender].canVote == false, "Voter already registered!");
        require(now < timelimit, "Registration period has ended");
        
        setup.allotToken(msg.sender);
        
        registeredVoters[msg.sender] = voter(
            {
                uniqueID: _uniqueID,
                canVote: true,
                district: _district
            }
        );


    }

    function applySetup(address _address) public {
        require(msg.sender == regAdmin);
        setup = SetupBlockchain(_address);
    }
    function authenticateID(address _address,string memory _uniqueID) public view returns (bool _authenticated){
        return (keccak256(abi.encodePacked((registeredVoters[_address].uniqueID)))) == (keccak256(abi.encodePacked((_uniqueID)))) ;
    }
    function getDistrict(address _address) public view returns(string memory _district){
        return registeredVoters[_address].district;
    }
    
    function votingStatus(address _address) public view returns (bool _votestatus){
        return registeredVoters[_address].canVote;
    }
    function hasVoted(address _address) public{
        registeredVoters[_address].canVote = false;
    }
}
