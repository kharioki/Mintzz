import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation ($address: String!, $alias: String!) {
    createUser(address: $address, alias: $alias) {
      address
      alias
    }
  }
`;
