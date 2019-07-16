import gql from 'graphql-tag';
import { clients } from '../../fragments'

export const getClients = gql`
  query GetClients @client {
    clients {
      ...clients
    }
  }
  ${clients}
`;

export const getClientList = gql`${clients}`;
