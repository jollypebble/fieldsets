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

export const getNodeList = gql`${nodes}`;
