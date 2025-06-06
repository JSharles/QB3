import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("QB3Deployment", (m) => {
  const qb3 = m.contract("QB3Token");

  const registry = m.contract("SpaceRegistry", [qb3]);

  m.call(qb3, "setMinter", [registry, true]);

  return { qb3, registry };
});
