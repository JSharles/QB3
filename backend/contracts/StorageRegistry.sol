// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title StorageRegistry - Manage storage registration
/// @notice Handle storage registration based on capicity, availability, accessibility and location
/// @dev Use Ownable for permission, some data are stored off-chain for privacy and security concerns.
/// @dev In a DePin context, owner is the DAO. One should implement multi-sig later on
contract StorageRegistry is Ownable {

    error InvalidCapacity();
    error NotSpaceOwner();

    struct Location {
        bytes32 locationHash;
        string floor;
        string additionalDetails;
    }

    struct Accessibility {
        bool requiresAppointment;
        string accessNotes;
    }

    struct Availability {
        bool available;
        uint256 startTime;
        uint256 endTime;
    }

    struct Reputation {
        uint256 successfulDeliveries;
        uint256 failedIncidents;
        uint256 slashingCount;
    }

    enum EventType { Registered, Updated, Deactivated }

    struct LogEvent {
        uint256 timestamp;
        EventType eventType;
    }

    struct StorageSpace {
        address owner;
        uint256 capacity;
        uint256 usedCapacity;
        Availability availability;
        Reputation reputation;
        Location location;
        bool isActive;
    }

    uint256 public nextSpaceId;
    mapping(uint256 => StorageSpace) public spaces;

    /// @notice Emitted when an operational event related to a storage space is logged.
    /// @dev Used to track business-related actions (e.g., updates or deactivation) in the space’s history, distinct from contract-level events like SpaceRegistered.
    /// @param spaceId Unique identifier of the storage space.
    /// @param eventType Type of operational event (e.g., Registered, Updated, Deactivated).
    /// @param timestamp Timestamp of when the event occurred.
    event SpaceEventLogged(uint256 indexed spaceId, EventType eventType, uint256 timestamp);

    /// @notice Emitted when a new storage space is successfully registered.
    /// @dev Triggered by the registerSpace function to log the creation of a storage space with its initial owner.
    /// @param spaceId Unique identifier assigned to the newly registered storage space.
    /// @param owner Address of the entity that owns the storage space.
    event SpaceRegistered(uint256 indexed spaceId, address indexed owner);

    modifier onlySpaceOwner(uint256 spaceId) {
        require(spaces[spaceId].owner == msg.sender, NotSpaceOwner());
        _;
    }

    constructor() Ownable(msg.sender) {}

    /// @notice Registers a new storage space with capacity, availability, and location hash.
    /// @dev Creates a StorageSpace entry, assigns a unique spaceId, and emits a SpaceRegistered event. Reverts if capacity is invalid.
    /// @param capacity Total capacity of the storage space (must be greater than 0).
    /// @param startTime Start time of the space’s availability window.
    /// @param endTime End time of the space’s availability window.
    /// @param locationHash Hash of the off-chain location data (e.g., keccak256 of address details).
    function registerSpace(
        uint256 capacity,
        uint256 startTime,
        uint256 endTime,
        bytes32 locationHash
    ) external {
        if (capacity <= 0) revert InvalidCapacity();

        uint256 spaceId = nextSpaceId++;
        spaces[spaceId] = StorageSpace({
            owner: msg.sender,
            capacity: capacity,
            usedCapacity: 0,
            availability: Availability(true, startTime, endTime),
            reputation: Reputation(0, 0, 0),
            location: Location(locationHash, "", ""),
            isActive: true
        });

        emit SpaceRegistered(spaceId, msg.sender);
    }

    /// @notice Logs an operational event for a storage space.
    /// @dev Emits a SpaceEventLogged event; restricted to the space owner.
    /// @param spaceId Unique identifier of the storage space.
    /// @param eventType Type of event to log (e.g., Registered, Updated, Deactivated).
    function logEvent(uint256 spaceId, EventType eventType) external onlySpaceOwner(spaceId) {
        emit SpaceEventLogged(spaceId, eventType, block.timestamp);
    }

    /// @notice Deactivates an existing storage space.
    /// @dev Sets isActive to false and logs a Deactivated event; restricted to the space owner.
    /// @param spaceId Unique identifier of the storage space to deactivate.
    function deactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
        spaces[spaceId].isActive = false;
        emit SpaceEventLogged(spaceId, EventType.Deactivated, block.timestamp);
    }

}