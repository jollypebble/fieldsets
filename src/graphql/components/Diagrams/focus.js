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

export const setCurrentFocus = gql`
  mutation SetCurrentFocus($id: ID!) {
    setCurrentFocus(id: $id) @client
  }
`;
