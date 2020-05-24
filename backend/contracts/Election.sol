pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

import "./Registration.sol";
import "./SetupBlockchain.sol";
import "./Ballot.sol";
contract Election{
    address ElectionAdmin;
    uint ElectionDealine;
    Registration registration;
    SetupBlockchain setup;
    mapping(address => address) ballots;
    
    constructor() public{
        ElectionAdmin = msg.sender;
        ElectionDealine = now + 86400;
    }
    

    function vote(string memory _uniqueID, uint256[] memory _votes) public{
        require(registration.votingStatus(msg.sender) == true, "You're not allowed to vote!");
        require(registration.authenticateID(msg.sender,_uniqueID) == true, "Invalid Credentials!");
        Ballot(setup.getBallot(registration.getDistrict(msg.sender))).vote(_votes,msg.sender);
        registration.hasVoted(msg.sender);
    }
    
    function acquireRegistration(address _address) private{
        registration = Registration(_address);
    }
    function applySetup(address _address) public {
        setup = SetupBlockchain(_address);
    }
} 
