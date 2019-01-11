import gql from 'graphql-tag';

export const getCurrentFocusQuery = gql`
  query GetCurrentFocus {
    getCurrentFocus @client {
      id
      centerX
      centerY
    }
  }
`;
