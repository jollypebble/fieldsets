import {MetaTypes, SetTypes, FieldTypes} from './enums';
const metatypes = MetaTypes.join(" \n");
const settypes = SetTypes.join(" \n");
const fieldtypes = FieldTypes.join(" \n");

export const typeDefs = `

  type Member implements Set {
    id: ID!
    name: String
    type: SetType
    parent: ID
    children: [ID]
    meta: Meta
    roles: [ID]
  }

  type Account implements Set {
    id: ID!
    name: String!
    type: SetType
    parent: ID
    children: [ID]
    members: [ID]
    meta: Meta
  }

  type Role implements Set {
    id: ID!
    name: String
    type: SetType
    parent: ID
    children: [ID]
    meta: Meta
  }

  type FieldSet implements Set {
    id: ID!
    name: String
    type: SetType
    parent: ID
    children: [ID]
    fields: [ID]
    meta: Meta
  }

  type Field {
    id: ID!
    name: String
    description: String
    parent: [ID]
    children: [ID]
    fieldsets: [ID]
    value: JSON
    type: FieldType
    callback: JSONObject
    order: Int
    owner: Member
    meta: Meta
  }

  type Zoom implements Coordinate {
    x: Int
    y: Int
    Scale: Int
  }

  type Center implements Coordinate {
    x: Int
    y: Int
  }

  type Meta {
    id: ID!
    type: MetaType
    data: JSONObject
  }

  interface Coordinate {
    x: Int
    y: Int
  }

  type Focus {
    id: ID!
    name: String
    focusID: ID
    focusGroup: ID
    parent: ID
    center: JSONObject
    container: JSONObject
    depth: Int
    expanded: Boolean
    zoom: JSONObject
  }

  input ContainerData {
    id: ID!
    name: String
    type: String
    parent: ID
    children: [ID]
    fields: [ID]
  }

  input Fields {
    fields: [ID]
  }

  inputFieldData {
    id: ID!
    name: String
    description: String
    parent: [ID]
    children: [ID]
    fieldsets: [ID]
    value: JSON
    type: FieldType
    callback: JSONObject
    order: Int
    owner: Member
    meta: Meta
  }

  type Mutation {
    updateFocus(id: ID!): Focus
    updateContainer(data: ContainerData): [FieldSet]
    updateFields(data: FieldData): [Field]
  }

  type Query {
    fetchFocus: Focus
    fetchContainer: FieldSet
    fetchContainerData: [FieldSet]
    fetchFields(data: Fields): [Field]
  }

  enum FieldType {
    ${fieldtypes}
  }

  enum SetType {
    ${settypes}
  }

  enum MetaType {
    ${metatypes}
  }

  scalar JSON
  scalar JSONObject

  interface Set {
    id: ID!
    type: SetType
    parent: ID
    children: [ID]
    meta: Meta
  }
`;
