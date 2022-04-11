const hre = require("hardhat");

async function main() {
  const MintzNFT = await hre.ethers.getContractFactory("MintzNFT");
  const mintzNFT = await MintzNFT.deploy();

  await mintzNFT.deployed();

  console.log("MintzNFT deployed to:", mintzNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });