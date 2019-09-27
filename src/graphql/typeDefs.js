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
    label: String
    parent: ID
    fieldsets: [ID]
    value: JSON
    type: FieldType
    dependencies: [ID]
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
    parent: ID
    center: JSONObject
    depth: Int
    zoom: JSONObject
  }

  type Mutation {
    updateFocus(id: ID!): Focus
    updateField(id: ID!): Field!
    updateFieldSet(id: ID): FieldSet
    updateFieldSets(id: ID): [FieldSet]
    updateMeta(id: ID): Meta
    updateMember(id: ID): Member
    updateAccount(id: ID): Account
    updateRole(id: ID): Role
  }

  type Query {
    fetchFieldSets(id: ID): [FieldSet]
    fetchFieldSet(id: ID): FieldSet
    fetchFields: [Field]
    fetchField(id: ID): Field
    fetchMeta(id: ID): Meta
    fetchAccounts: [Account]
    fetchAccount: Account
    fetchMembers: [Member]
    fetchRoles: [Role]
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
