pragma solidity >=0.4.22 <0.6.0;

contract voterToken{
    address owner;
    string name;
    string symbol;
    uint256 totalVote;
    mapping (address => uint256) public balance;
    constructor(string memory _name, string memory _symbol) public{
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
    }
    function mint(address _to, uint256 _amount) public{
        require(msg.sender == owner, "You do not have permission to alot voting token");
        balance[_to] = balance[_to] + _amount;
        totalVote += _amount;
    }
    function balanceOf(address _owner) view public returns (uint256){
        return balance[_owner];
    }
    
    function transfer(address _from,address _to, uint _value) public returns (bool){
        require (balance[_from] >= _value,"Insuficient Balance");
        owner = _to;
        balance[_from] = balance[_from] - _value;
        balance[_to] = balance[_to] + _value;
        return true;
    }
}
