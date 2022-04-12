import { useState } from 'react';
import { truncateAddress } from '../../utils/helpers';

export function Wallet({ address, avatar, showUser }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
        className="inline-flex items-center text-secondary bg-white border border-primary rounded-full text:sm shadow-md"
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <div className="items-center w-10 mr-2">
          <img src={avatar} className="w-10 h-auto border rounded-full" />
        </div>
        {
          toggleDropdown ?
            <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            :
            <svg className="w-5 h-5 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        }
      </button>

      {toggleDropdown && (
        <div className="origin-top-right absolute right-0 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="divide-y divide-gray-100 shadow" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem" tabIndex="-1" id="menu-item-2"
            >
              {truncateAddress(address)}
            </a>
            <div
              onClick={showUser}
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Disconnect
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
