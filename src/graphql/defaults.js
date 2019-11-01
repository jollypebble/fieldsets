// The default place holders. These might not be needed after we do a cache prime and can most likely be removed from index.js.
export const defaults = {
  focus: {
    id: 'current',
    focusID: 'default',
    focusGroup: '',
    type: '',
    container: {
      containerID: 'default',
      type: 'container',
      __typename: 'JSONObject'
    },
    expanded: false,
    center: { x: 0, y: 0, __typename: 'JSONObject' },
    depth: 0,
    zoom: { scale: 1, __typename: 'JSONObject' },
    __typename: 'Focus'
  },
  container: null
};
