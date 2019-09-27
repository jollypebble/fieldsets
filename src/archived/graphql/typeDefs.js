export const typeDefs = `
  type Set implements Sets {
    id: ID!
    name: String
    type: SetType
    parent: ID
    children: [Set]
    meta: [Meta]
  }

  type Account implements Sets {
    id: ID!
    name: String!
    type: String
    parent: ID
    children: [Account]
    members: [Member]
    roles: [Role]
    meta: [Meta]
  }

  type Member implements Sets {
    id: ID!
    name: String
    type: String
    parent: ID
    children: [Member]
    meta: [Meta]
    roles: [Role]
  }

  type Role implements Sets {
    id: ID!
    name: String
    type: String
    parent: ID
    children: [Role]
    meta: [Meta]
  }

  type FieldSet implements Sets {
    id: ID!
    name: String
    type: SetType
    parent: ID
    children: [Set]
    fields: [Field]
    meta: [Meta]
  }

  type Field implements Data {
    id: ID!
    name: String
    label: String
    parent: ID
    fieldsets: JSON
    value: JSON
    type: DataType
    dependencies: [Field]
    order: Int
    owner: [Member]
    meta: [Meta]
  }

  type Meta {
    id: ID!
    meta: JSON
  }

  type Focus {
    id: ID!
    name: String
    parent: ID
    coordinate: JSON
    depth: Int
  }

  type Mutation {
    updateFocus(id: ID!): Set
    updateField(id: ID!, type: String!, value: Value!, formula: String): Field!
  }

  type Query {
    fieldsets: [FieldSet]
    fieldsets(id: ID!): FieldSet
    fetchFieldSets: [FieldSet]
  }

  enum DataType {
    default
    text
    number
    currency
    decimal
    coordinate
    list
    dictionary
    object
    search
    bool
    date
    time
    formula
    function
  }

  enum SetType {
    account
    member
    role
    container
    fieldset
    diagram
    interface
    data
    meta
    custom
  }

  scalar JSON
  scalar JSONObject

  interface Sets {
    id: ID!
    name: String
    type: SetType
    parent: ID
    children: [Sets]
    meta: [Data]
  }

  interface Data {
    id: ID!
    label: String
    type: DataType
    value: JSON
  }
`;
