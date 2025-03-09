// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SustainabilityClaims {
    struct Claim {
        string supplierName;
        string documentIPFSHash;
        string verificationStatus;
        address verifier;
        uint256 timestamp;
        string comments;
    }

    mapping(uint256 => Claim) public claims;
    mapping(string => bool) public verifiedSuppliers;
    mapping(string => bool) private isIPFSHashStored; // Prevent duplicate IPFS storage
    mapping(address => bool) public verifiers; // Allows multiple verifiers

    uint256 public claimCount;
    address payable public owner;
    uint public unlockTime;

    event ClaimStored(uint256 indexed claimId, string supplierName, string documentIPFSHash, string verificationStatus, address verifier, uint256 timestamp);
    event ClaimVerified(uint256 indexed claimId, string verificationStatus, string comments);
    event SupplierVerified(string supplierName, bool status);
    event Withdrawal(uint amount, uint when);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can execute this");
        _;
    }

    modifier onlyVerifier() {
        require(verifiers[msg.sender] || msg.sender == owner, "Only authorized verifiers can verify claims");
        _;
    }

    constructor(uint _unlockTime) payable {
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");
        owner = payable(msg.sender);
        unlockTime = _unlockTime;
    }

    function storeClaim(string memory _supplierName, string memory _documentIPFSHash) public {
        require(!isIPFSHashStored[_documentIPFSHash], "Document already exists");
        claimCount++;
        claims[claimCount] = Claim(
            _supplierName, 
            _documentIPFSHash, 
            "Pending", 
            msg.sender, 
            block.timestamp, 
            ""
        );
        isIPFSHashStored[_documentIPFSHash] = true;
        emit ClaimStored(claimCount, _supplierName, _documentIPFSHash, "Pending", msg.sender, block.timestamp);
    }

    function verifyClaim(uint256 _claimId, string memory _status, string memory _comments) public onlyVerifier {
        require(_claimId > 0 && _claimId <= claimCount, "Invalid claim ID");
        claims[_claimId].verificationStatus = _status;
        claims[_claimId].comments = _comments;
        if (keccak256(abi.encodePacked(_status)) == keccak256(abi.encodePacked("Approved"))) {
            verifiedSuppliers[claims[_claimId].supplierName] = true;
            emit SupplierVerified(claims[_claimId].supplierName, true);
        }
        emit ClaimVerified(_claimId, _status, _comments);
    }

    function getClaim(uint256 _claimId) public view returns (string memory, string memory, string memory, address, uint256, string memory) {
        require(_claimId > 0 && _claimId <= claimCount, "Invalid claim ID");
        Claim memory claim = claims[_claimId];
        return (claim.supplierName, claim.documentIPFSHash, claim.verificationStatus, claim.verifier, claim.timestamp, claim.comments);
    }

    function withdraw() public onlyOwner {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(address(this).balance > 0, "No funds to withdraw");

        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}
