import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation ($address: String!, $alias: String!) {
    createUser(address: $address, alias: $alias) {
      address
      alias
    }
  }
`;

export const CREATE_NFT_ITEM = gql`
  mutation ($input: NftItemInput) {
    createNftItem(input: $input) {
      nftIndex
      owner
    }
  }
`;

export const UPDATE_NFT_ITEM = gql`
  mutation ($nftIndex: Int, $input: NftItemInput) {
    updateNftItem(nftIndex: $nftIndex, input: $input) {
      nftIndex
      owner
    }
  }
`;

export const CREATE_BID = gql`
  mutation ($input: BidInput) {
    createBid(input: $input) {
      bidder
      bidAmount
      itemId
    }
  }
`;

export const CREATE_REACTION = gql`
  mutation ($nftId: Int, $userAddress: String) {
    createReaction(nftId: $nftId, userAddress: $userAddress) {
      nftId
      userAddress
    }
  }
`;

export const DELETE_REACTION = gql`
  mutation ($nftId: Int, $userAddress: String) {
    deleteReaction(nftId: $nftId, userAddress: $userAddress) {
      nftId
      userAddress
    }
  }
`;
