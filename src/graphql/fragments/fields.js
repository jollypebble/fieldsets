export const fields = `
  fragment field on Field @client {
      id
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
  fragment fields on FieldList @client {
    id
    list {
      ...field
    }
  }
`;
