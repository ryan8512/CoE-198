pragma solidity >=0.4.22 <0.6.0;

contract voterToken{
    address owner;
    string name;
    string symbol;
    uint256 totalVote;
    mapping (address => uint256) public balance;
    constructor(string memory _name, string memory _symbol, uint256 _totalVote) public{
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        totalVote = _totalVote;
        balance[msg.sender] = _totalVote;
    }
    
    function balanceOf(address _owner) view public returns (uint256){
        return balance[_owner];
    }
    
    function transfer(address _to, uint _value) public returns (bool){
        require (balance[msg.sender] >= _value);
        
        address _from = msg.sender;
        owner = _to;
        balance[_from] = balance[_from] - _value;
        balance[_to] = balance[_to] + _value;
        return true;
    }
}
