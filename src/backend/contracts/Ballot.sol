pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;
import "./SetupBlockchain.sol";
import "./voterToken.sol";

contract Ballot{
    SetupBlockchain setup;
    string district;
    SetupBlockchain.candidate[] public Candidates;
    mapping(uint16 => address) votingTokens;
    
    constructor(SetupBlockchain.candidate[] memory _candidates,
    SetupBlockchain.votingToken[] memory _tokens
    ,string memory _district) public{
    
        setup = SetupBlockchain(msg.sender);
        district = _district;
        for (uint i =0; i < _candidates.length;i++){
            Candidates.push(SetupBlockchain.candidate({
                name: _candidates[i].name,
                candidateAddress: _candidates[i].candidateAddress,
                position: _candidates[i].position
            }));
        }
        for (uint16 i =0; i < _tokens.length;i++){
            uint16 j = _tokens[i].position;
            votingTokens[j] = _tokens[i].tokenAddress;
        }
    }
    function vote(uint256[] memory votes, address _address) public{
        for (uint i = 0;i < votes.length;i++){
            voterToken(votingTokens[Candidates[votes[i]].position]).transfer(_address,Candidates[votes[i]].candidateAddress,1);
        }
    }
    /*For user interface*/
    function candidateCount() public view returns(uint _count){
        return Candidates.length;
    }

    function getCandidates() public view returns(SetupBlockchain.candidate[] memory _candidateList){
        return Candidates;
    }
}
