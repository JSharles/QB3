// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./QB3Token.sol";

/// @title StorageRegistry - Manage storage registration
/// @notice Handle storage registration based on capicity, availability and location
/// @dev Use Ownable for permission, some data are stored off-chain for privacy and security concerns.
/// @dev In a DePin context, owner is the DAO. One should implement multi-sig later on
contract StorageRegistry is Ownable {

    error InvalidCapacity();
    error NotSpaceOwner();
    error InvalidTimeRange();
    error InsufficientBalance();
    error InsufficientVolume();

    IERC20 public qb3Token;

    /**
     * @notice In the context of the POC these values are fixed, but should be dynamic in the future
     */
    uint256 public rewardPerUnit = 2 * 10**18;
    uint256 public reservationCost = 5 * 10**18;

    /**
     * @notice Availability window for a storage space.
     * @dev Re-added the 'available' field so that the updateSpace() function compiles.
     */
    struct Availability {
        bool available;
        uint256 startTime;
        uint256 endTime;
    }

    /**
     * @notice Core data structure for a storage space.
     */
    struct StorageSpace {
        address owner;
        uint256 capacity;
        uint256 usedVolume;
        Availability availability;
        bytes32 locationHash;
        bool isActive;
    }

    /**
     * @notice Unique ID for each storage space. Autoincremented on each registration.
     */
    uint256 public nextSpaceId;

    /**
     * @notice Mapping from spaceId to StorageSpace details.
     */
    mapping(uint256 => StorageSpace) public spaces;

     /**
     * @notice Mapping from zone to total available volume.
     */
    mapping(bytes32 => uint256) public zoneAvailableVolume;

    /**
     * @notice Emitted when a new storage space is successfully registered.
     * @param spaceId Unique identifier assigned to the newly registered storage space.
     * @param owner Address of the entity that owns the storage space.
     */
    event SpaceRegistered(uint256 indexed spaceId, address indexed owner);

    /**
     * @notice Emitted when an existing storage space is updated.
     * @param spaceId Unique identifier of the storage space.
     * @param timestamp Block timestamp of the update.
     */
    event SpaceUpdated(uint256 indexed spaceId, uint256 timestamp);

    /**
     * @notice Emitted when an existing storage space is deactivated.
     * @param spaceId Unique identifier of the storage space.
     * @param timestamp Block timestamp of the deactivation.
     */
    event SpaceDeactivated(uint256 indexed spaceId, uint256 timestamp);

    /**
     * @notice Emitted when an existing storage space is re-activated.
     * @param spaceId Unique identifier of the storage space.
     * @param timestamp Block timestamp of the re-activation.
     */
    event SpaceReactivated(uint256 indexed spaceId, uint256 timestamp);


    modifier onlySpaceOwner(uint256 spaceId) {
        require(spaces[spaceId].owner == msg.sender, NotSpaceOwner());
        _;
    }

    modifier onlyIfActive(uint256 spaceId) {
    require(spaces[spaceId].isActive, "Storage space is inactive");
    _;
}

    /**
     * @notice Sets the contract deployer as the initial owner.
     * @dev This can be replaced by a DAO or multi-sig in the future.
     */
    constructor(address _qb3Token) Ownable(msg.sender) {
        qb3Token = IERC20(_qb3Token);
    }

    /**
     * @notice Registers a new storage space with capacity, availability, and location hash.
     * @dev Creates a StorageSpace entry, assigns a unique spaceId, and emits a SpaceRegistered event.
     *      Reverts if capacity <= 0.
     * @param capacity Total capacity of the storage space (must be greater than 0).
     * @param startTime Start time of the space’s availability window.
     * @param endTime End time of the space’s availability window.
     * @param locationHash Hash of the off-chain location data (e.g., keccak256 of address details).
     */
    function registerSpace(
        uint256 capacity,
        uint256 startTime,
        uint256 endTime,
        bytes32 locationHash
    ) external {
        if (capacity <= 0) {
            revert InvalidCapacity();
        }

        if (startTime > endTime) {
            revert InvalidTimeRange();
            }

        uint256 spaceId = nextSpaceId++;
        spaces[spaceId] = StorageSpace({
            owner: msg.sender,
            capacity: capacity,
            usedVolume: 0,
            availability: Availability(true, startTime, endTime),
            locationHash: locationHash,
            isActive: true
        });

        uint256 reward = capacity * rewardPerUnit;
        QB3Token(address(qb3Token)).mint(msg.sender, reward);
        emit SpaceRegistered(spaceId, msg.sender);
    }

    /**
     * @notice Updates the capacity and availability of a specific storage space.
     * @dev Restricted to the space owner. Could be extended for other fields if needed.
     * @param spaceId The unique identifier of the storage space.
     * @param newCapacity New capacity for the storage space (must be > 0).
     * @param newAvailability Updated boolean (true = available, false = not).
     * @param newStartTime Updated start time for availability.
     * @param newEndTime Updated end time for availability.
     * @param newLocationHash Updated location hash.
     */
    function updateSpace(
        uint256 spaceId,
        uint256 newCapacity,
        bool newAvailability,
        uint256 newStartTime,
        uint256 newEndTime,
         bytes32 newLocationHash
    )
        external
        onlySpaceOwner(spaceId)
        onlyIfActive(spaceId)
    {
        if (newCapacity == 0) {
            revert InvalidCapacity();
        }

        if (newStartTime > newEndTime) {
            revert InvalidTimeRange();
        }

        StorageSpace storage spaceRef = spaces[spaceId];
        spaceRef.capacity = newCapacity;
        spaceRef.availability.available = newAvailability;
        spaceRef.availability.startTime = newStartTime;
        spaceRef.availability.endTime = newEndTime;
        spaceRef.locationHash = newLocationHash;

        emit SpaceUpdated(spaceId, block.timestamp);
    }

    /**
     * @notice Deactivates an existing storage space (sets isActive to false), it should be used to soft delete a space.
     * @dev Logs a SpaceDeactivated event; restricted to the space owner.
     * @param spaceId Unique identifier of the storage space to deactivate.
     */
    function deactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
        spaces[spaceId].isActive = false;
        emit SpaceDeactivated(spaceId, block.timestamp);
    }

      /**
     * @notice Re-activates a storage space (sets isActive to true).
     * @dev Logs a SpaceReactivated event; restricted to the space owner.
     * @param spaceId Unique identifier of the storage space to deactivate.
     */
     function reactivateSpace(uint256 spaceId) external onlySpaceOwner(spaceId) {
    require(!spaces[spaceId].isActive, "Already active");
    spaces[spaceId].isActive = true;
    emit SpaceReactivated(spaceId, block.timestamp);
    }

}
