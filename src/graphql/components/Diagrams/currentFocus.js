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

export const focusCircleQuery = gql`
  mutation FocusCircle($id: String!, $centerX: Float!, $centerY: Float!) {
    focusCircle(id: $id, centerX: $centerX, centerY: $centerY) @client
  }
`;
