// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./QB3Token.sol";

contract SpaceRegistry is Ownable {
    error InvalidCapacity();
    error NotSpaceOwner();
    error InvalidTimeRange();

    event SpaceRegistered(uint256 indexed spaceId, address indexed owner);
    event AvailabilityUpdated(uint256 indexed spaceId, uint256 newStartTime, uint256 newEndTime);

    QB3Token public qb3Token;

    uint256 public rewardPerUnit = 1 * 10 ** 18;
    uint256 public nextSpaceId;
    uint256 public constant MIN_AVAILABILITY_DURATION = 1 hours;

    struct Availability {
        uint256 startTime;
        uint256 endTime;
    }

    struct Space {
        address host;
        uint256 capacity;
        uint256 usedVolume;
        bool isActive;
        Availability availability;
        bytes32 zoneHash;
        bytes32 locationHash;
    }

    struct Zone {
        uint256 totalCapacity;
        uint256 usedCapacity;
        uint256[] spaceIds;
    }

    mapping(uint256 => Space) public spaces;
    mapping(bytes32 => Zone) public zones;

    modifier onlySpaceOwner(uint256 spaceId) {
        if (spaces[spaceId].host != msg.sender) {
            revert NotSpaceOwner();
        }
        _;
    }

    modifier onlyIfActive(uint256 spaceId) {
        require(spaces[spaceId].isActive, "Space is inactive");
        _;
    }

    constructor(address _qb3Token) Ownable(msg.sender) {
        qb3Token = QB3Token(_qb3Token);
    }

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

    function deactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
        spaces[spaceId].isActive = false;
    }

    function reactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
        spaces[spaceId].isActive = true;
    }

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

    function getZoneInfo(bytes32 zoneHash) external view returns (uint256 total, uint256 used) {
        Zone storage zone = zones[zoneHash];
        return (zone.totalCapacity, zone.usedCapacity);
    }
}
