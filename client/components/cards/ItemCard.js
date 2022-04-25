import Jazzicon from 'react-jazzicon';
import { useMutation } from '@apollo/client';

import { Button, Favorite } from "../buttons";
import { AvatarGroup, Price, Timer } from "../common";
import { CREATE_REACTION, DELETE_REACTION } from "../../apollo/mutations";
import { GET_REACTIONS } from "../../apollo/queries";

export function ItemCard({ nft, deets, bids, reactions, showBidModal, setBidPrice, address, setItemToBid }) {
  const liked = reactions?.find(reaction => reaction.userAddress === address);

  const [createReaction, { loading: creatingReaction, error: createReactionError }] = useMutation(CREATE_REACTION, {
    variables: {
      nftId: nft.index,
      userAddress: address
    },
    refetchQueries: [{ query: GET_REACTIONS }]
  });

  const [deleteReaction, { loading: deletingReaction, error: deleteReactionError }] = useMutation(DELETE_REACTION, {
    variables: {
      nftId: nft.index,
      userAddress: address
    },
    refetchQueries: [{ query: GET_REACTIONS }]
  });

  const handleLike = () => {
    if (liked) {
      deleteReaction();
    } else {
      createReaction();
    }
  }

  const details = deets[0];

  const handleShowBidModal = () => {
    setBidPrice(details.currentBid);
    setItemToBid(nft.index);
    showBidModal();
  };

  return (
    <div className="rounded-md drop-shadow-md relative">
      <div className="rounded-md relative items-center">
        <div>
          <div className="absolute right-2 top-2 ">
            <Favorite liked={liked} handleLike={handleLike} />
          </div>
          {/* <div className="absolute left-0 bottom-4 ">
            <Timer />
          </div> */}
        </div>
        <img src={nft.image} className="w-full h-64 md:h-72 rounded-md bottom-2" />
      </div>
      <div className="py-4">
        <div className="flex flex-row items-center text-lightText">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <p className="font-light text-xs text-left ml-2 mb-1">Highest bid: {details?.currentBid} cUSD</p>
        </div>
        <div className="font-semibold text-secondary text-sm text-left cursor-pointer">
          <a href="#">{nft.name}</a>
        </div>
        <div className="flex flex-row text-sm mb-2 justify-between items-center border-b border-gray-300 py-4">
          <div className="flex flex-row items-center w-1/2 text-left space-x-1">
            <Jazzicon size={40} seed={details?.creator} />
            <div className="px-1">
              <p className="text-xs text-secondary text-left w-full">{details?.creatorAlias}</p>
              <p className="text-xs text-lightText font-light text-left">Creator</p>
            </div>
          </div>
          <div className="flex">
            <Price price={details?.price} symbol="cUSD" />
          </div>
        </div>
        <div className="flex flex-row text-sm mb-2 justify-between items-center py-1 w-full">
          <div className="flex flex-row items-center w-1/2 sm:w-3/5 text-left space-x-1">
            {bids?.length ?
              <>
                <AvatarGroup bids={bids} />
              </>
              :
              <p className="text-xs text-secondary text-left">No bids yet</p>
            }
          </div>
          <Button handleClick={handleShowBidModal} />
        </div>
      </div>
    </div>
  )
}