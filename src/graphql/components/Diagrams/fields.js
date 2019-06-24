import gql from 'graphql-tag';
import { fields } from '../../fragments'

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
  mutation UpdateField($id: ID!) {
    updateField(id: $id) @client
  }
  ${fields}
`;

export const getFieldList = gql`${fields}`;
