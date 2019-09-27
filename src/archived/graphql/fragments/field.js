export const field = `
  fragment field on Field @client {
    id
    name
    description
    parent
    value
    type
    callback
    owner
    notes
    order
    dependencies
  }
`;
