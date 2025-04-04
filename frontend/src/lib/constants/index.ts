export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "QB3";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Connects Spaces";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const QB3_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_QB3_TOKEN_ADDRESS ||
  "0x0000000000000000000000000000000000000000";
export const SPACE_REGISTRY_ADDRESS =
  process.env.NEXT_PUBLIC_SPACE_REGISTRY_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

export const SPACE_REGISTRY_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_qb3Token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidCapacity",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTimeRange",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSpaceOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spaceId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SpaceRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "nextSpaceId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "qb3Token",
    outputs: [
      {
        internalType: "contract QB3Token",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "capacity",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "zoneHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "locationHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "registerSpace",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerUnit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "spaces",
    outputs: [
      {
        internalType: "address",
        name: "host",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "usedVolume",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
        ],
        internalType: "struct SpaceRegistry.Availability",
        name: "availability",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "zoneHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "locationHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "zones",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCapacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "usedCapacity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
