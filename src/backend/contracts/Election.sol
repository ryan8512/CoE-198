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
    event RegistrationLinked(
        address RegistrationAddress
    );

    event SetupBlockchainLinked(
        address SetupAddress
    );
    
    constructor() public{
        ElectionAdmin = msg.sender;
        ElectionDealine = now + 86400;
    }
    modifier administrative() {
        require(msg.sender == ElectionAdmin,"Unauthorized Access");
        _;
    }

    function vote(string memory _uniqueID, uint256[] memory _nationalVotes, uint256[] memory _localVotes) public{
        require(registration.votingStatus(msg.sender) == true, "You're not allowed to vote!");
        require(registration.authenticateID(msg.sender,_uniqueID) == true, "Invalid Credentials!");
        Ballot(setup.getBallot("NATIONAL")).vote(_nationalVotes,msg.sender);
        Ballot(setup.getBallot(registration.getDistrict(msg.sender))).vote(_localVotes,msg.sender);
        registration.hasVoted(msg.sender);
    }
    
    function acquireRegistration(address _address) administrative public{
        registration = Registration(_address);
        emit RegistrationLinked(_address);
    }
    
    function applySetup(address _address) administrative public {
        setup = SetupBlockchain(_address);
        emit SetupBlockchainLinked(_address);
    }

    /*For UI*/
    function getNationalCandidates() public view returns(SetupBlockchain.candidate[] memory _candidates){
        return Ballot(setup.getBallot("NATIONAL")).getCandidates();
    }

    function getLocalCandidates() public view returns(SetupBlockchain.candidate[] memory _candidates){
        return Ballot(setup.getBallot(registration.getDistrict(msg.sender))).getCandidates();
    }

    function getNationalCount() public view returns(uint _count){
        return Ballot(setup.getBallot("NATIONAL")).candidateCount();
    }

    function getLocalCount() public view returns(uint _count){
        return Ballot(setup.getBallot(registration.getDistrict(msg.sender))).candidateCount();
    }
} 
