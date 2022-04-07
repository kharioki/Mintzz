import Head from 'next/head'
import { ItemCard } from '../components/cards'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col min-h-screen py-2 font-mono">
      <Head>
        <title>Mintzz</title>
        <meta name="description" content="NFT minter and auction on Celo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-full flex-1 px-2 sm:px-12 xl:px-24 sm:py-6 text-center">
        <div className="lg:flex lg:items-center lg:justify-between">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">Mint and Auction NFTS</h2>

        </div>
        <div className="w-full mb-2 md:px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-4">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
