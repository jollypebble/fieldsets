import gql from 'graphql-tag';

export const getCurrentFocus = gql`
  query getCurrentFocus @client {
    currentFocus {
      id
      name
      centerX
      centerY
      fields
    }
  }
`;

export const setCurrentFocus = gql`
  mutation SetCurrentFocus($id: ID!) {
    setCurrentFocus(id: $id) @client
  }
`;
