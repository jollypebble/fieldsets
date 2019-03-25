import gql from 'graphql-tag';

export const getOwners = gql`
  query getOwners @client {
    owners {
      ...owner
    }
  }
  fragment owner on Owner @client {
    id
    name
    parent
    fields
    children
  }
`;
