export function Price({ price, symbol }) {
  return (
    <span className="items-center text-green-500 border border-green-500 rounded-md text-xs font-medium px-2 py-1">
      Price: {price} {symbol}
    </span>
  )
}
