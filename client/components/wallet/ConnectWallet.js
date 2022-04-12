export function ConnectWallet({ connect }) {
  return (
    <button
      className="text-primary bg-white border border-primary hover:bg-primary hover:text-white rounded-full text-sm p-3 text-center"
      onClick={connect}
    >
      <span className="text-xs sm:text-sm font-mono">Connect Wallet</span>
    </button>
  )
}
