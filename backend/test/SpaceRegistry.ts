import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { assert, expect } from "chai";
import { parseEther } from "viem";

describe("QB3 Deployment", () => {
  let owner: any, addr1: any, qb3TokenSc: any, spaceRegistrySc: any;

  const deployQB3Fixture = async () => {
    const [ownerClient, addr1Client] = await hre.viem.getWalletClients();

    const qb3TokenSc = await hre.viem.deployContract("QB3Token");
    const spaceRegistrySc = await hre.viem.deployContract("SpaceRegistry", [
      qb3TokenSc.address,
    ]);

    await qb3TokenSc.write.setMinter([spaceRegistrySc.address, true]);

    return {
      owner: ownerClient,
      addr1: addr1Client,
      qb3TokenSc,
      spaceRegistrySc,
    };
  };

  beforeEach(async () => {
    ({ owner, addr1, qb3TokenSc, spaceRegistrySc } = await loadFixture(
      deployQB3Fixture
    ));
  });

  describe("Deployment", () => {
    it("should set the correct owner for SpaceRegistry", async () => {
      const contractOwner = await spaceRegistrySc.read.owner();
      assert.equal(
        contractOwner.toLowerCase(),
        owner.account.address.toLowerCase(),
        "Owner address mismatch"
      );
    });

    it("should set the correct QB3 token address in SpaceRegistry", async () => {
      const tokenAddress = await spaceRegistrySc.read.qb3Token();
      assert.equal(
        tokenAddress.toLowerCase(),
        qb3TokenSc.address.toLowerCase(),
        "QB3 token address mismatch"
      );
    });

    it("should set SpaceRegistry as minter in QB3Token", async () => {
      const isMinter = await qb3TokenSc.read.isMinter([
        spaceRegistrySc.address,
      ]);
      assert.isTrue(isMinter, "SpaceRegistry should be set as minter");
    });

    it("should have correct initial rewardPerUnit", async () => {
      const rewardPerUnit = await spaceRegistrySc.read.rewardPerUnit();
      assert.equal(
        rewardPerUnit.toString(),
        "1000000000000000000",
        "Incorrect initial rewardPerUnit"
      );
    });

    it("should have initial nextSpaceId as 0", async () => {
      const nextSpaceId = await spaceRegistrySc.read.nextSpaceId();
      assert.equal(
        nextSpaceId.toString(),
        "0",
        "Initial nextSpaceId should be 0"
      );
    });
  });

  describe("RegisterSpace", () => {
    const getValidParams = () => ({
      capacity: BigInt(100),
      zoneHash: "0x" + "0".repeat(64),
      locationHash: "0x" + "1".repeat(64),
      startTime: BigInt(Math.floor(Date.now() / 1000)),
      endTime: BigInt(Math.floor(Date.now() / 1000) + 3600),
    });

    it("should successfully register a new space", async () => {
      const { capacity, zoneHash, locationHash, startTime, endTime } =
        getValidParams();

      await spaceRegistrySc.write.registerSpace([
        capacity,
        zoneHash,
        locationHash,
        startTime,
        endTime,
      ]);

      const space = await spaceRegistrySc.read.spaces([BigInt(0)]);
      const [
        host,
        spaceCapacity,
        usedVolume,
        isActive,
        availability,
        spaceZoneHash,
        spaceLocationHash,
      ] = space;

      assert.equal(host.toLowerCase(), owner.account.address.toLowerCase());
      assert.equal(spaceCapacity.toString(), capacity.toString());
      assert.equal(usedVolume.toString(), "0");
      assert.isTrue(isActive);
      assert.equal(availability.startTime.toString(), startTime.toString());
      assert.equal(availability.endTime.toString(), endTime.toString());
      assert.equal(spaceZoneHash, zoneHash);
      assert.equal(spaceLocationHash, locationHash);

      const nextSpaceId = await spaceRegistrySc.read.nextSpaceId();
      assert.equal(nextSpaceId.toString(), "1");
    });

    it("should mint correct amount of tokens to host", async () => {
      const { capacity, zoneHash, locationHash, startTime, endTime } =
        getValidParams();

      const initialBalance = await qb3TokenSc.read.balanceOf([
        owner.account.address,
      ]);
      await spaceRegistrySc.write.registerSpace([
        capacity,
        zoneHash,
        locationHash,
        startTime,
        endTime,
      ]);

      const finalBalance = await qb3TokenSc.read.balanceOf([
        owner.account.address,
      ]);
      const expectedReward = capacity * parseEther("1");
      assert.equal(
        (finalBalance - initialBalance).toString(),
        expectedReward.toString()
      );
    });

    it("should update zone information", async () => {
      const { capacity, zoneHash, locationHash, startTime, endTime } =
        getValidParams();

      await spaceRegistrySc.write.registerSpace([
        capacity,
        zoneHash,
        locationHash,
        startTime,
        endTime,
      ]);

      const zone = await spaceRegistrySc.read.zones([zoneHash]);
      const [totalCapacity, usedCapacity] = zone;

      assert.equal(totalCapacity.toString(), capacity.toString());
      assert.equal(usedCapacity.toString(), "0");

      // Puisque spaceIds n'est pas retourné dans le mapping, on doit vérifier différemment
      const space = await spaceRegistrySc.read.spaces([BigInt(0)]);
      assert.equal(space[5], zoneHash); // Vérifie que le space appartient à cette zone
    });

    it("should revert with InvalidCapacity when capacity is 0", async () => {
      const { zoneHash, locationHash, startTime, endTime } = getValidParams();

      await expect(
        spaceRegistrySc.write.registerSpace([
          BigInt(0),
          zoneHash,
          locationHash,
          startTime,
          endTime,
        ])
      ).to.be.rejectedWith("InvalidCapacity");
    });

    it("should revert with InvalidTimeRange when startTime > endTime", async () => {
      const { capacity, zoneHash, locationHash } = getValidParams();
      const startTime = BigInt(Math.floor(Date.now() / 1000) + 3600);
      const endTime = BigInt(Math.floor(Date.now() / 1000));

      await expect(
        spaceRegistrySc.write.registerSpace([
          capacity,
          zoneHash,
          locationHash,
          startTime,
          endTime,
        ])
      ).to.be.rejectedWith("InvalidTimeRange");
    });
  });
});
