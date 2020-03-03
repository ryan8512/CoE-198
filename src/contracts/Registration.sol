//pragma solidity ^0.5.0;
pragma solidity ^0.6.1;

contract Registration{
    string public name;
    uint public timelimit;
    uint public voteCount = 0; //debugging
    mapping(string => voter) public voters;
    mapping(uint => voter) public votinglist; // debugging
    struct voter{
        string publicKey;
        bool canVote;
    }
    event VoterRegistered(
        uint id,
        string publicKey,
        bool canVote
    );
    constructor() public{
        name = "Registration Blockchain";
        timelimit = block.timestamp + 86400; // one day
    }
    function registerVoter(string memory _credentials, string memory _publicKey) public{
        assert(bytes(_publicKey).length == 128);
        if(voters[_credentials].canVote != true && block.timestamp < timelimit){
            voters[_credentials].publicKey = _publicKey;
            voters[_credentials].canVote = true;
            votinglist[voteCount].publicKey = _credentials;
            votinglist[voteCount].canVote = true;
            voteCount++;
            emit VoterRegistered(voteCount,_credentials,true);
        }
    }
    function votingStatus(string memory _credentials) public view returns (bool _votestatus){
        return voters[_credentials].canVote;
    }
}
