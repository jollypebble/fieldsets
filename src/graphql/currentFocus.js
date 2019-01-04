import gql from 'graphql-tag';

export const getCurrentFocus = gql`
  query GetCurrentFocus {
    currentFocus @client {
      currentX
      currentY
    }
  }
`;

export const getCurrentFocus = ({
  props: ({ data: { currentFocus } }) => ({
    currentFocus
  })
});
