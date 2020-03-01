pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;
import "voterToken.sol";
contract Ballot{
    voterToken token;
    struct candidate{
        string name;
        address walletAddress;
        uint256 position;
    }
    candidate[] public candidatelist;
    constructor(string[] memory _name,
    address[] memory _walletAddress, 
    uint256[] memory _position)public{
        for(uint i = 0;i < _name.length;i++){
            candidatelist.push(candidate({
               name: _name[i],
               walletAddress: _walletAddress[i],
               position: _position[i]
            }));
        }
    }
    
    function vote(address[] memory _walletAddress,uint256[] memory _position) public{
        for(uint i =0; i < _walletAddress.length;i++){
                if(_position[i] == 1){
                    token.transfer(_walletAddress[i],1);
                }
                else if(_position[i] == 2){
                    token.transfer(_walletAddress[i],1);
                }
                else{
                    token.transfer(_walletAddress[i],1);
                }
        }
    }
}
