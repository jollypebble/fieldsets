export const typeDefs = `
  type Circle {
    id: String!
    isFocused: Boolean
    isActive: Boolean
    centerX: Float!
    centerY: Float!
  }

  type Mutation {
    focusCircle(id: String!, centerX: Float!, centerY: Float!): Circle
  }

  type Query {
    getCurrentFocus: Circle
  }
`;
