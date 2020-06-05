pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

import "./voterToken.sol";
import "./Ballot.sol";
import "./Registration.sol";

contract SetupBlockchain{
    address private setupAdmin;
    votingToken[] public votingTokenlist;
    address private regAddress;
    mapping (string => district) DistrictElection;

    /*Results.sol*/
    candidate[] district_candidates;
    candidate[] competition_candidates;
    candidate winner;
    results candidateAndVote;
    uint256 buffer;
    uint256 max;

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

    struct results{
        candidate Candidates;
        uint256 votes;
    }

    event CandidatesCreated(
        string name,
        address candidateAddress,
        uint16 position
    );

    event TokensCreated(
        string name,
        address tokenAddress,
        uint256 amountPerVoter,
        uint16 position
    );

    event RegistrationLinked(
        address RegistrationAddress
    );
    
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
            emit TokensCreated(_name[i],address(newToken),_amountPerVoter[i],_position[i]);
        }
    }
    function setReg(address _address)administrative public{
        regAddress = _address;
        emit RegistrationLinked(_address);
    }
    function addCandidates(candidate[] memory _Candidates, string memory _district) administrative public{
        for (uint i = 0; i < _Candidates.length;i++){
            DistrictElection[_district].Candidates.push(candidate({
                name: _Candidates[i].name,
                candidateAddress: _Candidates[i].candidateAddress,
                position: _Candidates[i].position
            }));
            emit CandidatesCreated(_Candidates[i].name,_Candidates[i].candidateAddress,_Candidates[i].position);
        }
    }
    function createBallot(string memory _district) administrative public {
        Ballot newBallot = new Ballot(DistrictElection[_district].Candidates,votingTokenlist,_district);
        DistrictElection[_district].ballot = address(newBallot);
    }
    function getBallot(string memory _district) public view returns(address _ballotAddress){
        return DistrictElection[_district].ballot;
    }
    function allotToken() public{
        require(msg.sender == regAddress, "Unauthorized access!");
        for(uint i = 0;i < votingTokenlist.length;i++){
            voterToken(votingTokenlist[i].tokenAddress).mint(tx.origin, votingTokenlist[i].amountPerVoter);
        }
    }
    
    function getResult(string memory _districts, uint16 _position) public returns(results memory _Array){
        //Get all candidates from a certain district
        max = 0; //reset the state of the maximum
        for(uint i = 0; i < DistrictElection[_districts].Candidates.length; i++){
            district_candidates.push(candidate({
                name: DistrictElection[_districts].Candidates[i].name,
                candidateAddress: DistrictElection[_districts].Candidates[i].candidateAddress,
                position: DistrictElection[_districts].Candidates[i].position
            }));
        }
        //Get all candidates from the same position from a certain district
        for(uint j = 0; j < district_candidates.length; j++){
            if(district_candidates[j].position == votingTokenlist[_position].position){
                competition_candidates.push(candidate({
                    name: district_candidates[j].name,
                    candidateAddress: district_candidates[j].candidateAddress,
                    position: district_candidates[j].position
                }));
            }
        }
        //Compare Balance of all same position, same district candidates, and PIC winner
        for(uint k = 0; k < competition_candidates.length; k++){
            buffer = voterToken(votingTokenlist[_position].tokenAddress).balanceOf(competition_candidates[k].candidateAddress);
            if(buffer > max){
                max = buffer;
                winner = competition_candidates[k];
            }
        }
        candidateAndVote = results({
            Candidates: winner,
            votes:max
        });
        return candidateAndVote;
    }
}
