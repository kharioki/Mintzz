export const ERC20_DECIMALS = 18;

// format a wallet address
export const truncateAddress = (address) => {
  if (!address) return
  return address.slice(0, 5) + "..." + address.slice(address.length - 4, address.length);
}

// convert from big number
export const formatBigNumber = (num) => {
  if (!num) return
  return num.shiftedBy(-ERC20_DECIMALS).toFixed(2);
}

export const userExists = (users, address) => {
  return users.find(user => user.address === address)
}

export const findNewNftMinted = (nfts, items) => {
  // filter missing items from nfts
  const _nfts = nfts.filter(nft => {
    const _item = items?.find(item => item.nftIndex === nft.index)
    return !_item
  })
  return _nfts
  // const _items = nfts.filter(nft => !items?.find(item => item.nftIndex === nft.index))
  // return _items
}
