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

export const getFieldList = gql`${fields}`;
