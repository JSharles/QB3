// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./QB3Token.sol";

/// @title SpaceRegistry
/// @notice A contract for registering and managing spaces with capacity and availability
/// @dev Inherits from OpenZeppelin's Ownable for restricted access control
contract SpaceRegistry is Ownable {
    error InvalidCapacity();
    error NotSpaceOwner();
    error InvalidTimeRange();

    /// @notice Emitted when a new space is registered
    /// @param spaceId The unique ID of the registered space
    /// @param owner The address of the space owner
    event SpaceRegistered(uint256 indexed spaceId, address indexed owner);

    /// @notice Emitted when a space's availability is updated
    /// @param spaceId The unique ID of the space
    /// @param newStartTime The new start time of availability
    /// @param newEndTime The new end time of availability
    event AvailabilityUpdated(uint256 indexed spaceId, uint256 newStartTime, uint256 newEndTime);

    /// @notice The QB3Token contract instance for rewarding space hosts
    QB3Token public qb3Token;

    /// @notice Reward amount per unit of capacity (in wei)
    uint256 public rewardPerUnit = 1 * 10 ** 18;

    /// @notice The next available space ID
    uint256 public nextSpaceId;

    /// @notice Minimum duration for space availability (1 hour in seconds)
    uint256 public constant MIN_AVAILABILITY_DURATION = 1 hours;

    /// @notice Structure to store availability time range
    /// @param startTime The start time of availability (Unix timestamp)
    /// @param endTime The end time of availability (Unix timestamp)
    struct Availability {
        uint256 startTime;
        uint256 endTime;
    }

    /// @notice Structure to store space details
    /// @param host The address of the space owner
    /// @param capacity The total capacity of the space
    /// @param usedVolume The currently used volume of the space
    /// @param isActive Whether the space is currently active
    /// @param availability The daily time range during which the space is available
    /// @param zoneHash The hash identifying the zone of the space
    /// @param locationHash The hash identifying the location of the space
    struct Space {
        address host;
        uint256 capacity;
        uint256 usedVolume;
        bool isActive;
        Availability availability;
        bytes32 zoneHash;
        bytes32 locationHash;
    }

    /// @notice Structure to store zone details
    /// @param totalCapacity The total capacity of all spaces in the zone
    /// @param usedCapacity The total used capacity in the zone
    /// @param spaceIds Array of space IDs in the zone
    struct Zone {
        uint256 totalCapacity;
        uint256 usedCapacity;
        uint256[] spaceIds;
    }

    /// @notice Mapping from space ID to Space details
    mapping(uint256 => Space) public spaces;

    /// @notice Mapping from zone hash to Zone details
    mapping(bytes32 => Zone) public zones;

    /// @notice Restricts function access to the space owner
    /// @param spaceId The ID of the space to check ownership for
    modifier onlySpaceOwner(uint256 spaceId) {
        if (spaces[spaceId].host != msg.sender) {
            revert NotSpaceOwner();
        }
        _;
    }

    /// @notice Restricts function access to active spaces only
    /// @param spaceId The ID of the space to check activity for
    modifier onlyIfActive(uint256 spaceId) {
        require(spaces[spaceId].isActive, "Space is inactive");
        _;
    }

    /// @notice Constructor to initialize the contract
    /// @param _qb3Token The address of the QB3Token contract
    constructor(address _qb3Token) Ownable(msg.sender) {
        qb3Token = QB3Token(_qb3Token);
    }

    /// @notice Registers a new space
    /// @param capacity The capacity of the space
    /// @param zoneHash The hash identifying the zone
    /// @param locationHash The hash identifying the location
    /// @param startTime The start time of availability
    /// @param endTime The end time of availability
    function registerSpace(
        uint256 capacity,
        bytes32 zoneHash,
        bytes32 locationHash,
        uint256 startTime,
        uint256 endTime
    ) external {
        if (capacity == 0) revert InvalidCapacity();
        if (startTime > endTime || endTime - startTime < MIN_AVAILABILITY_DURATION) {
            revert InvalidTimeRange();
        }

        uint256 spaceId = nextSpaceId++;

        spaces[spaceId] = Space({
            host: msg.sender,
            capacity: capacity,
            usedVolume: 0,
            isActive: true,
            availability: Availability({
                startTime: startTime,
                endTime: endTime
            }),
            zoneHash: zoneHash,
            locationHash: locationHash
        });

        zones[zoneHash].totalCapacity += capacity;
        zones[zoneHash].spaceIds.push(spaceId);

        uint256 reward = capacity * rewardPerUnit;
        qb3Token.mint(msg.sender, reward);
        emit SpaceRegistered(spaceId, msg.sender);
    }

    /// @notice Deactivates a space
    /// @param spaceId The ID of the space to deactivate
    function deactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
        spaces[spaceId].isActive = false;
    }

    /// @notice Reactivates a space
    /// @param spaceId The ID of the space to reactivate
    function reactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
        spaces[spaceId].isActive = true;
    }

    /// @notice Updates the availability of a space
    /// @param spaceId The ID of the space to update
    /// @param newStartTime The new start time of availability
    /// @param newEndTime The new end time of availability
    function updateAvailability(
        uint256 spaceId,
        uint256 newStartTime,
        uint256 newEndTime
    ) external onlySpaceOwner(spaceId) {
        if (newStartTime > newEndTime || newEndTime - newStartTime < MIN_AVAILABILITY_DURATION) {
            revert InvalidTimeRange();
        }
        spaces[spaceId].availability = Availability(newStartTime, newEndTime);
        emit AvailabilityUpdated(spaceId, newStartTime, newEndTime);
    }

    /// @notice Retrieves total and used capacity for a zone
    /// @param zoneHash The hash identifying the zone
    /// @return total The total capacity of the zone
    /// @return used The used capacity of the zone
    function getZoneInfo(bytes32 zoneHash) external view returns (uint256 total, uint256 used) {
        Zone storage zone = zones[zoneHash];
        return (zone.totalCapacity, zone.usedCapacity);
    }
}