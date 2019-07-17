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
    parent: Set!
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

  type Client implements Data {
    id: ID!
    accountName: String!
    clientName1: String!
    clientName2: String
    cpaName: String!
    attyName: String!
    ipAddress: String!
  }

  type ClientList implements List {
    id: ID!
    list: [Client!]
  }

  type Set implements Entity {
    id: ID!
    name: String!
    children: SetList!
    parent: Set
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

  type SetList implements List {
    id: ID!
    list: [Set!]
  }

  scalar Value

  type Mutation {
    updateCurrentFocus(id: ID!): Set
    updateField(id: ID!, type: String!, value: Value!, formula: String): Field!
  }

  type Query {
    currentFocus: Set!
    clients: ClientList!
    fields: FieldList!
    getsetFields(id: ID!): FieldList!
    getSet(id: ID!): Set!
    sets: SetList!
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
