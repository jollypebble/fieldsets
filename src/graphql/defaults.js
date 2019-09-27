// The default place holders. These might not be needed after we do a cache prime and can most likely be removed from index.js.
import { fragmentDefaults } from './fragments/defaults';
export const defaults = {
  account: {
    ...fragmentDefaults.account,
    id: 'current',
    accountID: 'default',
  },
  focus: {
    id: 'current',
    focusID: 'default',
    type: '',
    container: {
      containerID: 'default',
      type: 'container',
      __typename: 'JSONObject'
    },
    center: { x: 0, y: 0, __typename: 'JSONObject' },
    depth: 0,
    scale: 1,
    zoom: { scale: 1, x: 0, y: 0, __typename: 'JSONObject' },
    __typename: 'Focus'
  },
  fieldsets: []
};
