import gql from 'graphql-tag';
import { nodes } from '../../fragments'

export const getNodes = gql`
  query getNodes @client {
    nodes {
      ...nodes
    }
  }
  ${nodes}
`;

export const getNode = gql`
  query GetNode($id: ID!) {
    getNode(id: $id) @client
  }
  ${nodes}
`;

export const getNodeList = gql`${nodes}`;
