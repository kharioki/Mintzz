import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      address
      alias
    }
  }
`;

export const GET_USER = gql`
  query ($address: String!) {
    getUser(address: $address) {
      address
      alias
    }
  }
`;

export const GET_NFT_ITEMS = gql`
  query {
    getNftItems {
      nftIndex
      owner
      creator
      creatorAlias
      price
      currentBid
      createdAt
    }
  }
`;

export const GET_BIDS = gql`
  query {
    getBids {
      bidder
      bidAmount
      itemId
      createdAt
    }
  }
`;

export const GET_REACTIONS = gql`
  query {
    getReactions {
      nftId
      userAddress
    }
  }
`;
