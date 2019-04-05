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
  type OwnerList {
    id: ID!
    list: [Field!]
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

  type FieldList {
    id: ID!
    list: [Field!]
  }

  type Circle implements Entity {
    id: ID!
    name: String!
    fields: FieldList!
    children: NodeList!
    centerX: Float!
    centerY: Float!
    depth: Int!,
    parent: Circle
  }

  type NodeList {
    id: ID!
    list: [Circle!]
  }

  type Mutation {
    setCurrentFocus(id: ID!): Circle
  }

  type Query {
    currentFocus: Circle!
    fields: FieldList!
    nodes: NodeList!
  }

  enum FieldType {
    currency
    status
    dob
    firstname
    lastname
  }
`;
