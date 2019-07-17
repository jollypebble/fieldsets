import gql from 'graphql-tag';

export const getCurrentFocus = gql`
  query getCurrentFocus @client {
    currentFocus @client {
      id
      name
      centerX
      centerY
      depth
      parent
    }
  }
`;

export const updateCurrentFocus = gql`
  mutation SetCurrentFocus($id: ID!) {
    updateCurrentFocus(id: $id) @client
  }
`;
