// Callbacks are set when the value is being handled by our react app.
// At some point we will move the hacky excel functions to react callbacks and push this json data to an official data store/relational db
export default [
  {
    id: 'currency',
    name: '$',
    label: '', // Can be used to override name when needed.
    callback: '', // Callback used to validate a value.
    options: [], // If not empty represents valid options.
  },
  {
    id: 'status',
    name: 'Status',
    label: '',
    callback: '', // Callback used to validate a value.
    options: [{id: 'none', name: 'None'},{id: 'done', name: 'Done'},{id: 'update', name: 'Requires Update'},{id: 'incomplete', name: 'Incomplete'}], // If not empty represents valid options.
  },
  {
    id: 'lastname',
    name: 'Last Name',
    label: '',
    callback: '', // Callback used to validate a value.
    options: [], // If not empty represents valid options.
  },
  {
    id: 'firstname',
    name: 'First Name',
    label: '',
    callback: '', // Callback used to validate a value.
    options: [], // If not empty represents valid options.
  },
  {
    id: 'dob',
    name: 'DOB',
    label: '',
    callback: '', // Callback used to validate a value.
    options: [], // If not empty represents valid options.
  },
];
