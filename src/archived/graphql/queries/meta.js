/**
 * Meta sets are sets that contain field data that is never rendered.
 * These types are useful for tracking data within your app, but that will not require a snapshot on save to persistant remote storage.
 */
 import gql from 'graphql-tag';
 import { meta } from '../fragments';

export const fetchFocus = gql`
  query FetchFocus @client {
    focus @client {
      id
      name
      parent
      coordinate {
        x
        y
      }
      depth
    }
  }
`;

export const updateFocus = gql`
  mutation UpdateFocus($id: ID!) {
    updateFocus(id: $id) @client
  }
`;

export const fetchMeta = gql`${meta}`;
