pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

import './SetupBlockchain.sol';


contract Results{
    address ResultsAdmin;
    SetupBlockchain setup;
    SetupBlockchain.results winner;

    event SetupBlockchainLinked(
        address SetupAddress
    );

    constructor () public{
        ResultsAdmin = msg.sender;
    }

    modifier administrative() {
        require(msg.sender == ResultsAdmin,"Unauthorized Access");
        _;
    }

    function applySetup(address _address) administrative public {
        setup = SetupBlockchain(_address);
        emit SetupBlockchainLinked(_address);
    }

    function processWinnerName(string memory _district, uint16 _position) public{
        winner = setup.getResult(_district,_position);
    }

    function getWinnerName() public view returns(string memory _name){
        return winner.Candidates.name;
    }

    function getWinnerVotes() public view returns(uint256 _votes){
        return winner.votes;
    }
}
