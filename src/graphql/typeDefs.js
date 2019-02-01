export const typeDefs = `
  interface Entity {
    id: String!
    name: String!
  }

  type Field implements Entity {
    id: String!
    parent: Circle!
    name: String!
    value: String!
    primary: Boolean!
  }

  type Circle implements Entity {
    id: String!
    name: String!
    fields: [Field]!
    centerX: Float!
    centerY: Float!
  }

  type Mutation {
    focusCircle(id: String!, centerX: Float!, centerY: Float!): Circle
  }

  type Query {
    getCurrentFocus: Circle!
    getFieldData: Field!
    getCircleFields: [Field!]!
  }
`;
