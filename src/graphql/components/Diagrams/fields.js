import gql from 'graphql-tag';

const fields = `
  fragment field on Field @client {
      id
      name
      value
      parent
  }
  fragment fields on FieldList @client {
    fields(id: $parent) {
      ...field
    }
  }
`;

export const getFields = gql`
  query getFields @client {
    ...fields
  }
  ${fields}
`;

export const getFieldData = gql`${fields}`;

export const getFieldList = gql`
  ${fields}
`;
