pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

import "voterToken.sol";
contract Ballot{
    string location;
    voterToken[] token;
    
    struct candidate{
        string name;
        address walletAddress;
        uint256 position;
    }
    candidate[] public candidatelist;
    
    constructor(string memory _location,
    string[] memory _name,
    address[] memory _walletAddress, 
    uint256[] memory _position)public{
        location = _location;
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
                    token[1].transfer(_walletAddress[i],1);
                }
                else if(_position[i] == 2){
                    token[2].transfer(_walletAddress[i],1);
                }
                else{
                    token[3].transfer(_walletAddress[i],1);
                }
        }
    }
    /**************************************DEBUG**********************************************/
    function listCandidates()public view returns(string[] memory){
        string[] memory _candidates = new string[](10);
        for(uint i = 0;i < candidatelist.length;i++)
            _candidates[i] = candidatelist[i].name;
        return _candidates;
    }
    
}
