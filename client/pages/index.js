import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useContractKit } from "@celo-tools/use-contractkit";
import { ContractKitProvider, Alfajores, NetworkNames } from "@celo-tools/use-contractkit";
import '@celo-tools/use-contractkit/lib/styles.css';

import { ItemCard } from '../components/cards'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { CreateNFTModal, BidModal, CreateUserModal } from '../components/modals'

function App() {
  const { address, connect, destroy } = useContractKit();

  const [showUserModal, setShowUserModal] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);

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

  useEffect(() => {
    if (address) {
      handleShowUserModal()
    }
  }, [address])

  return (
    <div className="flex flex-1 flex-col min-h-screen font-mono bg-bgColor">
      <Head>
        <title>Mintzz</title>
        <meta name="description" content="NFT minter and auction on Celo" />
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
            Mint, bid and auction NFTs and pay with Celo.
          </p>
        </div>
        <div className="w-full max-w-6xl  px-4 mb-2 lg:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-6 mt-4">
            <ItemCard showBidModal={handleShowBidModal} setBidPrice={setBidPrice} />
            <ItemCard showBidModal={handleShowBidModal} setBidPrice={setBidPrice} />
            <ItemCard showBidModal={handleShowBidModal} setBidPrice={setBidPrice} />
            <ItemCard showBidModal={handleShowBidModal} setBidPrice={setBidPrice} />
            <ItemCard showBidModal={handleShowBidModal} setBidPrice={setBidPrice} />
          </div>
        </div>
        {showNFTModal && <CreateNFTModal handleClose={handleCloseNFTModal} />}
        {showBidModal && <BidModal current={bidPrice} handleClose={handleCloseBidModal} />}
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
      <App />
    </ContractKitProvider>
  )
}
