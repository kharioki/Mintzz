import Link from 'next/link';
import { CreateNew } from '../buttons';
import { ConnectWallet, Wallet } from '../wallet';

export function Header({ address, avatar, showUser, showNFT }) {
  return (
    <nav className="flex justify-between items-center w-full bg-bgColor border-b border-pink-400 py-2 px-4">
      <Link href="/">
        <div className="flex items-center h-8 md:h-12 p-2 md:p-4 px-2 md:px-6 border-r-2 border-dashed border-primary">
          <p className="font-light font-mono text-primary text-xl md:text-2xl ">
            Mintzz
          </p>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-center space-x-2">
        {!address ? <ConnectWallet /> : <Wallet avatar={avatar} address={address} showUser={showUser} />}
        <CreateNew handleShow={showNFT} />
      </div>
    </nav>
  )
}
