pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

import "./voterToken.sol";
import "./Ballot.sol";

contract SetupBlockchain{
    address private setupAdmin;
    votingToken[] public votingTokenlist;
    //mapping(uint16 => candidate[]) Candidates;
    //mapping (string => address) ballots;
    mapping (string => district) DistrictElection;
    struct votingToken{
        string name;
        address tokenAddress;
        uint256 amountPerVoter;
        uint16 position;
    }
    struct candidate{
        string name;
        address candidateAddress;
        uint16 position;
    }
    
    struct district{
        candidate[] Candidates;
        address ballot;
    }
    
    constructor() public{
        setupAdmin = msg.sender;
    }
    
    modifier administrative() {
        require(msg.sender == setupAdmin,"Unauthorized Access");
        _;
    }
    
    function createToken (string[] memory _name,
    string[] memory _symbol,
    uint256[] memory _amountPerVoter,
    uint16[] memory _position)
    administrative public {
        for(uint i = 0 ;i < _name.length;i++){
            voterToken newToken = new voterToken(_name[i],_symbol[i]);
            votingTokenlist.push(votingToken(
                {name: _name[i],
                tokenAddress: address(newToken),
                amountPerVoter: _amountPerVoter[i],
                position: _position[i]
                }
            ));
        }
    }
    function addCandidates(candidate[] memory _Candidates, string memory _district) administrative public{
        for (uint i = 0; i < _Candidates.length;i++){
            DistrictElection[_district].Candidates.push(candidate({
                name: _Candidates[i].name,
                candidateAddress: _Candidates[i].candidateAddress,
                position: _Candidates[i].position
            }));
        }
    }
    function createBallot(string memory _district) administrative public {
        Ballot newBallot = new Ballot(DistrictElection[_district].Candidates,votingTokenlist,_district);
        DistrictElection[_district].ballot = address(newBallot);
    }
    function getBallot(string memory _district) public view returns(address _ballotAddress){
        return DistrictElection[_district].ballot;
    }
    function allotToken(address _address) administrative public{
        for(uint i = 0;i < votingTokenlist.length;i++){
            voterToken(votingTokenlist[i].tokenAddress).mint(_address, votingTokenlist[i].amountPerVoter);
        }
    }
}
