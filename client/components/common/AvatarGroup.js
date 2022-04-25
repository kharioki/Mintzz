import Jazzicon from 'react-jazzicon';

export function AvatarGroup({ bids }) {
  // slice(0, 2) - get the first 2 bids
  const arr = bids.slice(0, 2);
  const totalBids = bids.length;
  const plus = totalBids > 2 ? `+${totalBids - 2}` : '';

  return (
    <div className="flex">
      {arr.map((bid, i) => (
        <div key={i} className="w-6 h-6 rounded-full even:-ml-3">
          <Jazzicon diameter={24} seed={bid.bidder} />
        </div>
      ))}
      <p className="text-xs text-lightText ml-1 mt-1">{plus} placed bid</p>
    </div>
  )
}
