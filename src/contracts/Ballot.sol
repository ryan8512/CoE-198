pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;
import "./Registration.sol";
import "./SetupBlockchain.sol";
import "./voterToken.sol";
contract Ballot{
    SetupBlockchain setup;
    string district;
    candidate[] Candidates;
    mapping(uint16 => address) votingTokens;
    // struct votingToken{
    //     string name;
    //     address tokenAddress;
    //     uint256 amountPerVoter;
    //     uint16 position;
    // }
    struct candidate{
        string name;
        address candidateAddress;
        uint16 position;
    }
    
    constructor(SetupBlockchain.candidate[] memory _candidates,
    SetupBlockchain.votingToken[] memory _tokens
    ,string memory _district) public{
    
        setup = SetupBlockchain(msg.sender);
        district = _district;
        for (uint i =0; i < _candidates.length;i++){
            Candidates.push(candidate({
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
    function vote(uint256[] memory votes, address _address) public returns(uint x){
        for (uint i = 0;i < votes.length;i++){
            voterToken(votingTokens[Candidates[votes[0]].position]).transfer(_address,Candidates[votes[0]].candidateAddress,1);
        }
    }
    function getCandidates() public view returns(candidate[] memory _candidateList){
        return Candidates;
    }
}
