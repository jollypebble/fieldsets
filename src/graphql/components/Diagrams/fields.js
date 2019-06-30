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

export const getNodeFields = gql`
  query GetNodeFields($id: ID!) {
    getNodeFields(id: $id) @client
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
    allFieldData {
      edges {
        node {
          fieldId
          name
          description
          value
          type
          callback
          notes
          accounts
          parent
          order
          alwaysDisplay
        }
      }
    }
  }
`;

export const updateAllFields = gql`
  mutation updateAllFields($data: String!) {
    createFieldData(data: $data) {
      result {
        status
      }
    }
  }
`;
