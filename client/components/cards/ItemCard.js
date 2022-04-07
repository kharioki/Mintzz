import { useState } from "react";
import { Button, Favorite } from "../buttons";
import { AvatarGroup, Price, Timer } from "../common";

export function ItemCard() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-md drop-shadow-md relative">
      <div className="rounded-md relative items-center">
        <div>
          <div className="absolute w-full h-48 top-20 opacity-0 hover:opacity-100 hover:bg-opacity-50">
            <Button />
          </div>
          <div className="absolute right-2 top-2 ">
            <Favorite liked={liked} setLiked={setLiked} />
          </div>
          <div className="absolute left-0 bottom-4 ">
            <Timer />
          </div>
        </div>
        <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" className="w-full h-60 md:h-60 rounded-md bottom-2" />
      </div>
      <div className="py-4">
        <div className="flex flex-row items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <p className="font-light text-xs text-left ml-2 mb-1">Highest bid: 4.35 CELO</p>
        </div>
        <div className="font-semibold text-sm mb-2 text-left cursor-pointer">
          <a href="#">Item Name</a>
        </div>
        <div className="flex flex-row text-sm mb-2 justify-between items-center border-b border-gray-100 py-2">
          <div className="flex flex-row justify-between items-center text-left space-x-1">
            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" className="w-10 h-10 border border-green-200 rounded-md" />
            <div className="ml-2">
              <p className="text-xs text-left">Creator name</p>
              <p className="text-xs text-gray-400 font-light text-left">Creator</p>
            </div>
          </div>
          <Price price={4.35} symbol="CELO" />
        </div>
        <div className="flex flex-row text-sm mb-2 items-center py-2">
          <AvatarGroup />
          <p className="text-xs text-gray-400 ml-1">placed bid</p>
        </div>
      </div>
    </div>
  )
}