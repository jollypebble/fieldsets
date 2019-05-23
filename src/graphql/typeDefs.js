export const typeDefs = `
  interface Entity {
    id: ID!
    name: String!
  }

  interface List {
    id: ID!
    list: [Entity!]
  }

  interface Data {
    id: ID!
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
    parent: Node!
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

  type Node implements Entity {
    id: ID!
    name: String!
    children: NodeList!
    parent: Node
    centerX: Float!
    centerY: Float!
    display: DisplayData!
    depth: Int!
  }

  type DisplayData implements Data {
    id: ID!
    shape: String!
    attributes: [String]
    zoom: ZoomData!
    visible: Boolean!
    className: String!
  }

  type ZoomData implements Data {
    id: ID!
    scale: Float!
    x: Float!
    y: Float!
  }

  type NodeList implements List {
    id: ID!
    list: [Node!]
  }

  type Mutation {
    setCurrentFocus(id: ID!): Node
  }

  type Query {
    currentFocus: Node!
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
