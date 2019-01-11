import gql from 'graphql-tag';

export const focusCircleQuery = gql`
  mutation FocusCircle($id: String!, $centerX: Float!, $centerY: Float!) {
    focusCircle(id: $id, centerX: $centerX, centerY: $centerY) @client
  }
`;
