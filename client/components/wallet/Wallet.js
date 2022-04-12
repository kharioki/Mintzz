import { useState, useEffect, useRef } from 'react';
import Jazzicon from "@metamask/jazzicon";

import { truncateAddress, formatBigNumber } from '../../utils/helpers';
import { useBalance } from '../../hooks/useBalance';

export function Wallet({ address, disconnect, showUser }) {
  const { balance, getBalance } = useBalance();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        Jazzicon(36, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
        className="inline-flex items-center text-secondary bg-white border border-primary rounded-md shadow-md"
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <div className="flex py-1 items-center">
          <div ref={ref} className="w-10 h-10 rounded-full mr-2" />
          <p className='text-xs'>{truncateAddress(address)}</p>
        </div>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {toggleDropdown && (
        <div className="origin-top-right absolute right-0 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="divide-y divide-gray-100 shadow" role="none">
            <div className="flex text-gray-700 px-4 py-2 text-sm">
              {formatBigNumber(balance.cUSD)}
              <span className='text-sm ml-2'>cUSD</span>
            </div>
            <div
              onClick={disconnect}
              className="block py-2 px-4 text-sm text-pink-700 hover:bg-bgColor dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Disconnect
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
