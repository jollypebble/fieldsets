export const account = `
  fragment account on Account @client(always: true) {
    id
    name
    type
    parent
    children
    members
    meta {
      ...meta
    }
  }
`;

export const member = `
  fragment member on Member @client(always: true) {
    id
    name
    parent
    type
    children
    roles
    meta {
      ...meta
    }
  }
`;

export const role = `
  fragment role on Role @client(always: true) {
    id
    name
    type
    parent
    children
    meta {
      ...meta
    }
  }
`;
