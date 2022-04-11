export function ConnectWallet({ handleShow }) {
  return (
    <button
      className="text-primary bg-white border border-primary hover:bg-primary hover:text-white focus:outline-none font-medium rounded-full text-xs sm:text:sm p-2 text-center"
      onClick={() => handleShow()}
    >
      <span className="ml-2 hidden sm:block text-xs sm:text-sm font-mono">Connect Wallet</span>
    </button>
  )
}
