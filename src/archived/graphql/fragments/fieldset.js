import { set } from './set'
import { meta } from './meta'
import { field } from './field'

export const fieldset = `
  fragment fieldset on FieldSet @client {
    id
    name
    type
    parent
    children {
      ...set
    }
    fields {
      ...field
    }
    meta {
      ...meta
    }
  }
  ${set}
  ${meta}
  ${field}
`;
