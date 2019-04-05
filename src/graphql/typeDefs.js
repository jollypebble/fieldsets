export const typeDefs = `
  interface Entity {
    id: ID!
    name: String!
  }

  interface List {
    id: ID!
    list: [Entity!]
  }

  interface Node {
    id: ID!
    list: [Entity!]
    name: String!
    children: NodeList!
    parent: Node
  }

  type DataType {
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

  type OwnerList implements List {
    id: ID!
    list: [Owner!]
  }

  type Field implements Entity {
    id: ID!
    name: String!
    parent: Circle!
    value: String!
    alwaysDisplay: Boolean!
    datatype: DataType!
    callback: String!
    notes:[String!]!
    owners: OwnerList!
    order: Int!
  }

  type FieldList implements List {
    id: ID!
    list: [Field!]
  }

  type Circle implements Node {
    id: ID!
    name: String!
    children: NodeList!
    parent: Circle
    centerX: Float!
    centerY: Float!
  }

  type NodeList implements List {
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
    owners: OwnerList!
  }

  enum FieldType {
    currency
    status
    dob
    firstname
    lastname
  }
`;
