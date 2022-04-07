import Link from 'next/link';
import { CreateNew } from '../buttons';
import { Wallet } from '../wallet';

export function Header() {
  return (
    <nav className="flex justify-between items-center w-full border-b border-primary py-2 px-4">
      <Link href="/">
        <div className="flex items-center h-8 md:h-12 p-2 md:p-4 px-2 md:px-6 border-r-2 border-dashed border-primary">
          <p className="font-bold font-mono text-primary text-xl md:text-2xl ">
            Mintzz
          </p>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Wallet />
        <CreateNew />
      </div>
    </nav>
  )
}