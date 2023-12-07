import hre from "hardhat";

async function main() {
  const { deployer } = await hre.getNamedAccounts();
  const resolverUrl = process.env.RESOLVER_URL as string;

  const offchainResolver = await hre.viem.deployContract("OffchainResolver", [
    resolverUrl,
    [deployer],
  ]);

  console.log(`OffChain resolver deployed at ${offchainResolver.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
