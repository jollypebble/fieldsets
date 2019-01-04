import gql from 'graphql-tag';

export const defaults = {
  currentFocus: {
    __typename: `CurrentFocus`,
    id: '',
    currentX: 30.5,
    currentY: 46,
    lastX: 30.5,
    lastY: 46
  },
  viewer: null,
  circles: []
};

export const resolvers = {
  Mutation: {
    focusCircle: ( _, variables, { cache } ) => {
      const query = gql`
        query GetCurrentFocus {
          currentFocus @client {
            currentX
            currentY
          }
        }
      `;
      const previous = cache.readQuery({ query });
      cache.writeData({ data: {
        currentFocus: {
          __typename: `CurrentFocus`,
          id:  variables.id,
          currentX: variables.centerX,
          currentY: variables.centerY,
          lastX: previous.currentFocus.currentX,
          lastY: previous.currentFocus.currentY
        }
      } });
      return null;
    },
  },
};
