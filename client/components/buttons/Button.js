export function Button({ handleClick }) {
  return (
    <button
      className="text-white bg-primary hover:bg-white hover:text-primary rounded-full text-xs px-3 py-2 text-center items-center shadow-md shadow-pink-200"
      onClick={handleClick}
    >
      <span className="text-xs font-mono">Place Bid</span>
    </button>
  )
}
