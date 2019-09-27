import gql from 'graphql-tag';
import { account } from '../fragments'

export const fetchAllAccounts = gql`
  query FetchAllAccounts @client {
    account {
      ...account
    }
  }
  ${account}
`;

export const fetchAllMembers = gql`
  query FetchAllMembers @client {
    member {
      ...account
    }
  }
  ${account}
`;

export const fetchSubAccounts = gql`
  query FetchSubAccounts($id: ID!) @client {
    account(parent: $id) {
      ...account
    }
  }
  ${account}
`;


export const fetchAccount = gql`
  query FetchAccount($id: ID!) @client {
    account(id: $id) {
      ...account
    }
  }
  ${account}
`;

export const fetchMembers = gql`
  query FetchMembers($id: ID!) @client {
    member
  }
  ${account}
`;

export const updateMember = gql`
  ${account}
`;

export const updateAccount = gql`
  ${account}
`;


export const fetchMember = gql`${account}`;
