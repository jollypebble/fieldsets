import gql from 'graphql-tag';
import { fields } from '../../fragments';

export const getFields = gql`
  query GetFields @client {
    fields {
      ...fields
    }
  }
  ${fields}
`;

export const getSetFields = gql`
  query GetSetFields($id: ID!) {
    getSetFields(id: $id) @client
  }
  ${fields}
`;

export const updateField = gql`
  mutation UpdateField($data: Array) {
    updateField(data: $data) @client {
      id
    }
  }
  ${fields}
`;

export const getFieldList = gql`${fields}`;

export const getInitialFieldData = gql`
  query {
    allScreener(last: 1) {
      edges {
        node {
          id
          data
        }
      }
    }
  }
`;

export const updateAllFields = gql`
  mutation createScreener($data: String!) {
    createScreener(data: $data) {
      portfolioScreener {
        id
        data
        timestamp
        uuid
      }
    }
  }
`;
