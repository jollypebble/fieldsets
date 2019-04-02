export const typeDefs = `
  interface Entity {
    id: ID!
    name: String!
  }

  type DataType implements Entity {
    id: ID!
    name: String!
    format: String!
    options: [String]!
  }

  type Owner implements Entity {
    id: ID!
    name: String!
    firstname: String!
    lastname: [String]!
    dob: String!
  }

  type Field implements Entity {
    id: ID!
    name: String!
    parent: Circle!
    value: String!
    alwaysDisplay: Boolean!
    datatype: DataType!,
    callback: String!,
    notes:[String!]!,
    owners:[Owner!]!,
    order: Int!,
  }

  type Circle implements Entity {
    id: ID!
    name: String!
    fields: [Field!]!
    children: [NodeChild]
    centerX: Float!
    centerY: Float!
    depth: Int!,
    parent: Circle
  }
  
  type Mutation {
    setCurrentFocus(id: ID!): Circle
  }

  type Query {
    currentFocus: Circle!
    fields: [Field!]
    nodefields(parent: String): [Field!]
    nodes: [Circle!]
  }
  enum FieldType {
    currency
    status
    dob
    firstname
    lastname
  }
`;
