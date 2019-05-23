export const fields = `
  fragment field on Field @client {
      id
      name
      value
      parent
  }
  fragment fields on FieldList @client {
    id
    list {
      ...field
    }
  }
`;
