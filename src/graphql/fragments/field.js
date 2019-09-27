export const field = `
  fragment field on Field @client(always: true) {
    id
    name
    description
    parent
    value
    type
    callback
    owner
    order
    dependencies
    fieldsets
    meta {
      ...meta
    }
  }
`;
