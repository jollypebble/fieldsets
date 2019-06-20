import gql from 'graphql-tag';
import { fields } from '../../fragments'

export const getFields = gql`
  query getFields @client {
    fields {
      ...fields
    }
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
