import { useState } from 'react';
export function Wallet() {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
        className="inline-flex items-center text-secondary border border-primary p-2 rounded-md hover:text-white hover:bg-primary text-xs sm:text:sm"
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        Connect Wallet
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {toggleDropdown && (
        <div className="origin-top-right absolute right-0 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div className="py-1 divide-y divide-gray-100 shadow" role="none">
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Wallet address</a>
            <div className="py-1">
              <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Disconnect</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}