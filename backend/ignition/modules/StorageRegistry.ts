import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const StorageRegistryModule = buildModule("StorageRegistrygModule", (m) => {
  const storageRegistryContract = m.contract("StorageRegistry");

  return { storageRegistryContract };
});

export default StorageRegistryModule;
