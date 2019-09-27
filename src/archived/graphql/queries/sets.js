import gql from 'graphql-tag';
import { set } from '../fragments'

export const fetchSets = gql`
  query FetchSets($id: ID!) {
    fetchSets(id: $id) @client
  }
`;

export const fetchSet = gql`${set}`;
