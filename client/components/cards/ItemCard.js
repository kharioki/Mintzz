import { useState } from "react";
import { Button, Favorite } from "../buttons";
import { AvatarGroup, Price, Timer } from "../common";

export function ItemCard({ showBidModal, setBidPrice }) {
  const [liked, setLiked] = useState(false);

  const handleShowBidModal = () => {
    setBidPrice(4.35);
    showBidModal();
  };

  return (
    <div className="rounded-md drop-shadow-md relative">
      <div className="rounded-md relative items-center">
        <div>
          <div className="absolute w-full h-60 top-24 opacity-0 hover:opacity-100 hover:bg-opacity-50">
            <Button handleClick={handleShowBidModal} />
          </div>
          <div className="absolute right-2 top-2 ">
            <Favorite liked={liked} setLiked={setLiked} />
          </div>
          <div className="absolute left-0 bottom-4 ">
            <Timer />
          </div>
        </div>
        <img src="https://cdn.pixabay.com/photo/2022/02/19/09/59/fantasy-7022197_960_720.jpg" className="w-full h-64 md:h-72 rounded-md bottom-2" />
      </div>
      <div className="py-4">
        <div className="flex flex-row items-center text-lightText">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <p className="font-light text-xs text-left ml-2 mb-1">Highest bid: 4.35 CELO</p>
        </div>
        <div className="font-semibold text-secondary text-sm text-left cursor-pointer">
          <a href="#">Item Name</a>
        </div>
        <div className="flex flex-row text-sm mb-2 justify-between items-center border-b border-gray-300 py-4">
          <div className="flex flex-row justify-between items-center w-1/2 text-left space-x-1">
            <img
              src="https://cdn.pixabay.com/photo/2022/03/23/02/50/skeleton-7086311_960_720.png"
              className="w-10 h-auto border border-gray-50 rounded-md"
            />
            <div className="px-1">
              <p className="text-xs text-secondary text-left">Creator name</p>
              <p className="text-xs text-lightText font-light text-left">Creator</p>
            </div>
          </div>
          <div className="flex">
            <Price price={4.35} symbol="CELO" />
          </div>
        </div>
        <div className="flex flex-row text-sm mb-2 justify-between items-center py-1 w-full">
          <div className="flex flex-row items-center w-1/2 sm:w-3/5 text-left space-x-1">
            <AvatarGroup />
            <p className="text-xs text-lightText ml-1">+3 placed bid</p>
          </div>
          <Button handleClick={handleShowBidModal} />
        </div>
      </div>
    </div>
  )
}