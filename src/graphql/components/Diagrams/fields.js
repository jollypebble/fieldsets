import gql from 'graphql-tag';

export const getFields = gql`
  query getFields @client {
    fields {
      ...field
    }
  }
  fragment field on Field @client {
      id
      name
      value
      parent
  }
`;

export const getParentFields = gql`
  query getParentFields($parent: String!) @client {
    fields(parent: $parent) {
      ...field
    }
  }
`;
