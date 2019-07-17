import gql from 'graphql-tag';
import { sets } from '../../fragments'

export const getSets = gql`
  query getSets @client {
    sets {
      ...sets
    }
  }
  ${sets}
`;

export const getSet = gql`
  query GetSet($id: ID!) {
    getSet(id: $id) @client
  }
  ${sets}
`;

export const getSetList = gql`${sets}`;
