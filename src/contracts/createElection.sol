pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

import "voterToken.sol";

contract createElection{
    mapping(uint256 => address) votingTokenlist;
    constructor (string[] memory positions,
    string[] memory name, 
    string[] memory symbol, 
    uint256[] memory totalVote) 
    public{
        //Create Voting Tokens and fund this smart contract for distribution
        for(uint i = 0 ;i < positions.length;i++){
            address newToken = address(new voterToken(name[i],symbol[i],totalVote[i]));
            votingTokenlist[i] = newToken;
        }
        
    }
}
