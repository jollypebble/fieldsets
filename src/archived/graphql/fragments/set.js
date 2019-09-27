export const set = `
  fragment set on Set @client {
    id
    type
    name
    parent
    children {
      ...set
    }
  }
`;
