import { create as ipfsHttpClient } from 'ipfs-http-client';
import axios from 'axios';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export const createNft = async (
  contract,
  performActions,
  { name, description, image, owner, price }) => {
  await performActions(async kit => {
    if (!name || !description || !image || !owner || !price) {
      throw new Error('Missing required fields');
    }
    const { defaultAccount } = kit;

    // convert to json
    const data = JSON.stringify({
      name,
      description,
      image,
      owner,
      price,
    });

    try {
      // save to ipfs
      const added = await client.add(data);

      // ipfs url
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      // mint nft and save the ipfs url
      let transaction = await contract.methods
        .safeMint(owner, url)
        .send({ from: defaultAccount });

      return transaction;
    } catch (error) {
      console.log('Error: ', error);
    }
  });
};

export const uploadToIpfs = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const added = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });

    let url = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(url);
    return url;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};

export const getNfts = async (mintzContract) => {
  try {
    const nfts = [];
    const nftsLength = await mintzContract.methods.totalSupply().call();
    for (let i = 0; i < Number(nftsLength); i++) {
      const nft = new Promise(async (resolve) => {
        const res = await mintzContract.methods.tokenURI(i).call();
        const meta = await fetchNftMeta(res);
        const owner = await fetchNftOwner(mintzContract, i);
        resolve({
          index: i,
          owner,
          name: meta.data.name,
          image: meta.data.image,
          description: meta.data.description,
          price: meta.data.price,
        });
      });
      nfts.push(nft);
    }
    return Promise.all(nfts);
  } catch (e) {
    console.log({ e });
  }
};

export const fetchNftMeta = async (ipfsUrl) => {
  try {
    if (!ipfsUrl) return null;
    const meta = await axios.get(ipfsUrl);
    return meta;
  } catch (e) {
    console.log({ e });
  }
};

export const fetchNftOwner = async (mintzContract, index) => {
  try {
    return await mintzContract.methods.ownerOf(index).call();
  } catch (e) {
    console.log({ e });
  }
};

export const fetchNftContractOwner = async (mintzContract) => {
  try {
    let owner = await mintzContract.methods.owner().call();
    return owner;
  } catch (e) {
    console.log({ e });
  }
};
