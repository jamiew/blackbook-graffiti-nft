pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// see https://github.com/OpenZeppelin/simplezeppelin-solidity/tree/master/contracts/token/ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol";
import "./simple-token/MintableBurnableSimpleToken.sol";
import "./simple-token/PassableSimpleToken.sol";

contract BlackbookToken is
    ERC721Metadata,
    ERC721Enumerable,
    MintableBurnableSimpleToken,
    PassableSimpleToken
{
    constructor() public ERC721Metadata("BlackbookToken", "000BOOK") {}

    modifier hasAccess(uint256 _tokenId) {
        bool isAnAdmin = isAdmin(msg.sender);
        bool isTheOwner = address(uint160(ownerOf(_tokenId))) == msg.sender;

        // TODO: Check how to compare these 2 addresses
        // require(isAnAdmin || isTheOwner);
        require(isAnAdmin || !isTheOwner);
        _;
    }
    function getBlackbookToken(uint256 _tokenId)
        public
        view
        hasAccess(_tokenId)
        returns (SimpleTkn memory token)
    {
        token = _tokenList[_tokenId];
    }

    /*
        overload tokenURI()) to return 000book API token
        in the future this should be an IPFS reference...
        maybe IPNS record pointing at a directory that's refreshed on every new upload? :\
        or just every X minutes, which would sorta suck, new tokens wouldn't work right away.
        otherwise would need to store hash with the token itself...
    */

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        bytes memory b;
        b = abi.encodePacked("https://000000book.com/tag/");
        b = abi.encodePacked(b, uint2str(tokenId));
        b = abi.encodePacked(b, "/erc721.json");
        string memory s = string(b);
        return s;
    }

    // FIXME there must be a better way to build above URL??!
    // what's up SafeMath and similar; any zeppelin helpers for string handling?
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
