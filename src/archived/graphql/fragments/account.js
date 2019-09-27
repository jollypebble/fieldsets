import { meta } from './meta'

export const account = `
  fragment member on Member @client {
    id
    name
    parent
    roles
    meta
  }

  fragment account on Account @client {
    id
    name
    type
    parent
    children {
      ...account
    }
    members {
      ...members
    }
    roles {
      ...role
    }
    meta {
      ...meta
    }
  }

  fragment role on Role @client {
    id
    name
    type
    parent
    children {
      ...role
    }
    meta {
      ...meta
    }
  }
  ${meta}
`;
