pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/Roles.sol";

contract UserRole {
    using Roles for Roles.Role;

    event UserAdded(address indexed account);
    event UserRemoved(address indexed account);

    Roles.Role private _users;

    constructor() internal {
        _addUser(msg.sender);
    }

    modifier existsAsUser(address _user) {
        require(_users.has(_user), "DOES_NOT_HAVE_USER_ROLE");
        _;
    }

    modifier onlyUser() {
        require(isUser(msg.sender), "DOES_NOT_HAVE_USER_ROLE");
        _;
    }

    function isUser(address account) public view returns (bool) {
        return _users.has(account);
    }

    function _addUser(address account) internal {
        _users.add(account);
        emit UserAdded(account);
    }

    function _removeUser(address _addr) internal {
        _users.remove(_addr);
        emit UserRemoved(_addr);
    }
}
