import gql from 'graphql-tag';
import { meta } from './meta';
import { field } from './field';
import { account, member, role } from './account';
import { fieldset } from './fieldset';

export const fragments = {
  all: gql`
    ${field}
    ${fieldset}
    ${meta}
    ${member}
    ${account}
    ${role}`,
  field: gql`
    ${meta}
    ${field}`,
  fieldset: gql`
    ${fieldset}
    ${meta}
    ${field}`,
  member: gql`
    ${meta}
    ${role}`,
  account: gql`
    ${meta},
    ${member}
    ${role}`,
  role: gql`
    ${role}
    ${meta}`,
  meta: gql`
    ${meta}`,
}
