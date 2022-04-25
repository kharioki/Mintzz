import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useContractKit, ContractKitProvider, Alfajores, NetworkNames } from "@celo-tools/use-contractkit";
import '@celo-tools/use-contractkit/lib/styles.css';
import { ApolloClient, InMemoryCache, useQuery, ApolloProvider, useMutation } from '@apollo/client';
import BigNumber from "bignumber.js";

import { ItemCard } from '../components/cards'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { CreateNFTModal, BidModal, CreateUserModal } from '../components/modals'
import { GET_USERS, GET_USER, GET_NFT_ITEMS, GET_BIDS, GET_REACTIONS } from '../apollo/queries'
import { CREATE_NFT_ITEM, CREATE_BID, UPDATE_NFT_ITEM } from '../apollo/mutations'
import { findNewNftMinted, userExists, ERC20_DECIMALS } from '../utils/helpers';
import { Loader } from '../components/common';
import { getNfts, createNft } from '../utils/mint';
import { useMintContract } from '../hooks';
import { ConnectWallet } from '../components/wallet';

const URL = process.env.NODE_ENV === 'production' ? 'http://localhost:3000/api/graphql' : 'http://localhost:3000/api/graphql';

const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
  name: 'Mintzz',
  version: '1.0',
});

function App() {
  const { address, connect, destroy, performActions } = useContractKit();
  const mintzContract = useMintContract();

  const { data: users } = useQuery(GET_USERS);
  const { data: sessionUser } = useQuery(GET_USER, { variables: { address } });
  const { data: nftItems } = useQuery(GET_NFT_ITEMS);
  const { data: allBids } = useQuery(GET_BIDS);
  const { data: allReactions } = useQuery(GET_REACTIONS);

  const [createNftItem, { loading: creatingNftItem, error: createNftError }] = useMutation(CREATE_NFT_ITEM);
  const [createBid] = useMutation(CREATE_BID);
  const [updateNftItem] = useMutation(UPDATE_NFT_ITEM);

  // console.log('nftItems', nftItems?.getNftItems)
  // console.log('allBids', allBids?.getBids)
  // console.log('allReactions', allReactions?.getReactions)

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [itemToBid, setItemToBid] = useState(null);

  const handleShowUserModal = () => {
    setShowUserModal(true)
  }

  const handleCloseUserModal = () => {
    setShowUserModal(false)
  }

  const handleShowNFTModal = () => {
    setShowNFTModal(true)
  }

  const handleCloseNFTModal = () => {
    setShowNFTModal(false)
  }

  const handleShowBidModal = () => {
    setShowBidModal(true)
  }

  const handleCloseBidModal = () => {
    setShowBidModal(false)
  }

  const getNftAssets = useCallback(async () => {
    try {
      setLoading(true);
      const nfts = await getNfts(mintzContract);
      if (!nfts) return;
      setNfts(nfts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [mintzContract]);

  const addNft = async (data) => {
    try {
      setLoading(true);
      await createNft(mintzContract, performActions, data);
      getNftAssets();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };

  const handleCreate = async () => {
    if (items.length) {
      const item = items[0];
      const itemPrice = new BigNumber(item.price).shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const _price = Number(itemPrice);
      // console.log('itemPrice', _price)

      // create nft item
      await createNftItem({
        variables: {
          input: {
            nftIndex: item.index,
            owner: address,
            creator: address,
            creatorAlias: user?.alias,
            price: _price,
            currentBid: _price,
            createdAt: new Date().toISOString()
          }
        },
        refetchQueries: [{ query: GET_NFT_ITEMS }],
      });

      if (creatingNftItem) console.log('Creating nft item...', creatingNftItem)
      if (createNftError) console.log('Error creating nft item', createNftError)
    }
  }

  const handleCreateNftItem = async () => {
    // find the new nft minted
    const _user = sessionUser?.getUser;
    const _items = nftItems?.getNftItems;
    const _newItems = findNewNftMinted(nfts, _items);
    // console.log('_newItems', _newItems)
    if (_items) {
      setItems(_newItems);
      setUser(_user);
    }
  }

  const handleCreateBid = async (data) => {
    try {
      await createBid({
        variables: {
          input: {
            bidder: address,
            bidAmount: data.price,
            itemId: data.itemId,
            createdAt: new Date().toISOString()
          }
        },
        refetchQueries: [{ query: GET_BIDS }]
      });

      // update nft item
      await updateNftItem({
        variables: {
          nftIndex: data.itemId,
          input: {
            currentBid: data.price,
            updatedAt: new Date().toISOString()
          }
        },
        refetchQueries: [{ query: GET_NFT_ITEMS }],
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (users) {
      if (address && !userExists(users.users, address)) {
        handleShowUserModal()
      }
    }
  }, [address])

  useEffect(() => {
    try {
      if (mintzContract && address) {
        getNftAssets();
      }
    } catch (error) {
      console.log(error);
    }
  }, [mintzContract, address, getNftAssets, sessionUser]);

  useEffect(() => {
    handleCreateNftItem();
  }, [nfts, nftItems, user])

  useEffect(() => {
    handleCreate();
  }, [user, items])

  // console.log('nfts', nfts)
  // console.log('items', items)

  return (
    <div className="flex flex-1 flex-col min-h-screen font-mono bg-bgColor">
      <Head>
        <title>Mintzz</title>
        <meta name="description" content="NFT minter and auction on Celo stable coins" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        connect={connect}
        disconnect={destroy}
        address={address}
        showUser={handleShowUserModal}
        showNFT={handleShowNFTModal}
      />

      <main className="flex flex-col items-center w-full flex-1 px-2 sm:px-8 xl:px-24 sm:py-6 text-center">
        <div className="w-full max-w-6xl  text-left mb-2 border-b border-gray-100 p-2">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">Mint and Auction NFTS</h2>
          <p className="text-sm leading-6 text-gray-500">
            Mint, bid and auction NFTs and pay with Celo stable coins.
          </p>
        </div>

        {
          !address ? (
            <div className="w-full max-w-6xl mt-6  text-left mb-2 border-b border-gray-100 p-2">
              <p className="text-sm leading-6 text-gray-500 mb-2">
                But first, connect you CELO wallet to continue.
              </p>
              <ConnectWallet connect={connect} />
            </div>
          )
            :
            (
              <div className="w-full max-w-6xl  px-4 mb-2 lg:px-6">
                {!loading ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-6 mt-4">
                    {nftItems && nfts.map((nft, i) => (
                      <ItemCard
                        key={i}
                        nft={nft}
                        deets={nftItems?.getNftItems.filter(x => x.nftIndex === nft.index)}
                        bids={allBids?.getBids.filter(x => x.itemId === nft.index)}
                        reactions={allReactions?.getReactions.filter(x => x.nftId === nft.index)}
                        showBidModal={handleShowBidModal}
                        setBidPrice={setBidPrice}
                        address={address}
                        setItemToBid={setItemToBid}
                      />
                    ))}
                  </div>
                ) : (
                  <Loader />
                )}
              </div>
            )
        }
        {showNFTModal && address && <CreateNFTModal create={addNft} address={address} handleClose={handleCloseNFTModal} />}
        {showBidModal && <BidModal current={bidPrice} itemId={itemToBid} handleClose={handleCloseBidModal} create={handleCreateBid} />}
        {showUserModal && <CreateUserModal address={address} handleClose={handleCloseUserModal} />}

      </main>

      <Footer />
    </div>
  )

}

export default function Home() {
  return (
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
        explorer: "https://alfajores-blockscout.celo-testnet.org",
        chainId: 44787,
      }}
      dapp={{
        name: "Mintzz",
        description: "NFT Mint, Bid and Auction on Celo",
        url: "https://example.com",
      }}
    >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ContractKitProvider>
  )
}
