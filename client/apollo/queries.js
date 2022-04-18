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
