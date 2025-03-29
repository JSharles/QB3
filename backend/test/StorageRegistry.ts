import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";
import { assert, expect } from "chai";
import { getAddress, keccak256 } from "viem";

import StorageRegistryArtifact from "../artifacts/contracts/StorageRegistry.sol/StorageRegistry.json";
const StorageABI = StorageRegistryArtifact.abi;

describe("StorageRegistry", () => {
  const deployStorageRegistryContractFixture = async () => {
    const [owner, addr1] = await hre.viem.getWalletClients();
    const deployed = await hre.viem.deployContract("StorageRegistry");

    const sc = deployed;
    return { sc, owner, addr1 };
  };

  let sc: Awaited<
      ReturnType<typeof deployStorageRegistryContractFixture>
    >["sc"],
    owner: Awaited<
      ReturnType<typeof deployStorageRegistryContractFixture>
    >["owner"],
    addr1: Awaited<
      ReturnType<typeof deployStorageRegistryContractFixture>
    >["addr1"];

  beforeEach(async () => {
    ({ sc, owner, addr1 } = await loadFixture(
      deployStorageRegistryContractFixture
    ));
  });

  describe("Deployment", () => {
    it("should set the owner", async () => {
      assert.equal(await sc.read.owner(), getAddress(owner.account!.address));
    });
  });

  describe("On Space Registration", async () => {
    it("should revert if capacity is equal to 0", async () => {
      const startTime = BigInt(Math.floor(Date.now() / 1000));
      const endTime = startTime + 3600n;

      try {
        await sc.write.registerSpace(
          [
            0n,
            startTime,
            endTime,
            "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          ],
          { account: addr1.account }
        );

        assert.fail("Expected registerSpace to revert with InvalidCapacity");
      } catch (error: any) {
        expect(error.message || error.shortMessage).to.include(
          "InvalidCapacity"
        );
      }
    });

    it("should increment the spaceId based on the nextSpaceId", async () => {
      const startTime = BigInt(Math.floor(Date.now() / 1000));
      const endTime = startTime + 3600n;
      const previousId = await sc.read.nextSpaceId();
      await sc.write.registerSpace(
        [
          20n,
          startTime,
          endTime,
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        ],
        { account: addr1.account }
      );
      expect(Number(await sc.read.nextSpaceId())).to.be.equal(
        Number(previousId) + 1
      );
    });

    it("should add a new space to the registry with correct values", async () => {
      const TEST_SPACE = {
        capacity: 100n,
        startTime: 1698777600n,
        endTime: 1698864000n,
        locationHash:
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
      };

      await sc.write.registerSpace(
        [
          TEST_SPACE.capacity,
          TEST_SPACE.startTime,
          TEST_SPACE.endTime,
          TEST_SPACE.locationHash,
        ],
        { account: addr1.account }
      );

      const spaceId = (await sc.read.nextSpaceId()) - 1n;
      const [
        owner,
        capacity,
        usedCapacity,
        availability,
        reputation,
        location,
        isActive,
      ] = await sc.read.spaces([spaceId]);

      expect(getAddress(owner)).to.equal(getAddress(addr1.account.address));
      expect(capacity).to.equal(TEST_SPACE.capacity);
      expect(usedCapacity).to.equal(0n);
      expect(availability.available).to.be.true;
      expect(availability.startTime).to.equal(TEST_SPACE.startTime);
      expect(availability.endTime).to.equal(TEST_SPACE.endTime);
      expect(location.locationHash).to.equal(TEST_SPACE.locationHash);
      expect(isActive).to.be.true;
    });

    it("should emit an event when space is added successfully", async () => {
      const TEST_SPACE = {
        capacity: 100n,
        startTime: 1698777600n,
        endTime: 1698864000n,
        locationHash:
          "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
      };

      await sc.write.registerSpace(
        [
          TEST_SPACE.capacity,
          TEST_SPACE.startTime,
          TEST_SPACE.endTime,
          TEST_SPACE.locationHash,
        ],
        { account: addr1.account }
      );

      const events = await sc.getEvents.SpaceRegistered();

      assert.equal(events[0].args.owner?.toLowerCase(), addr1.account.address);
      assert.equal(events[0].eventName, "SpaceRegistered");
    });
  });
});
