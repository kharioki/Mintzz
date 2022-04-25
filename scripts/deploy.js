const hre = require("hardhat");

async function main() {
  const MintzNFT = await hre.ethers.getContractFactory("MintzNFT");
  const mintzNFT = await MintzNFT.deploy();

  await mintzNFT.deployed();

  console.log("MintzNFT deployed to:", mintzNFT.address);
  storeContractData(mintzNFT);
}

function storeContractData(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../client/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/MintzNFT-address.json",
    JSON.stringify({ MintzNFT: contract.address }, undefined, 2)
  );

  const MintzNFTArtifact = artifacts.readArtifactSync("MintzNFT");

  fs.writeFileSync(
    contractsDir + "/MintzNFT.json",
    JSON.stringify(MintzNFTArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
