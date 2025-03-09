const hre = require("hardhat");

async function main() {
  const unlockTime = Math.floor(Date.now() / 1000) + 3600 * 24 * 7; // Unlock in 7 days
  const SustainabilityClaims = await hre.ethers.getContractFactory("SustainabilityClaims");

  console.log("🚀 Deploying SustainabilityClaims contract...");
  const contract = await SustainabilityClaims.deploy(unlockTime);

  await contract.waitForDeployment(); // ✅ Correct method for deployment

  console.log(`✅ Contract deployed at: ${await contract.getAddress()}`);
}

// Execute deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
